import { FastifyInstance, FastifyPluginAsync, FastifyRequest, FastifyReply } from "fastify";
import { WeeklyBooks } from "./data";
import { ObjectId } from "@fastify/mongodb";

export const Hazanim = [
  "Avi Cohen", "Moshe Levi"
]
const hebcalRoute: FastifyPluginAsync = async (server: FastifyInstance): Promise<void> => {
  const db = server.mongo.db;
  const usersCollection = db?.collection('users');
  const ordersCollection = db?.collection('orders');

  // GET: Fetch Shabbat details and Hebrew date
  server.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const url = `https://www.hebcal.com/shabbat?cfg=json&geonameid=294760&M=on`;
      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      if (!res.ok) {
        return reply.status(404).send({ msg: "Failed to fetch Shabbat data" });
      }

      const data = await res.json();
      const currentDate = new Date();
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(currentDate.getDate() - 5);
      
      // Calculate the current week of the year
      const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
      const weekNumber = Math.floor(
        ((currentDate.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24) + startOfYear.getDay() + 1) / 7
      );

      // Determine the book to return for this week
      const bookIndex = weekNumber % WeeklyBooks.length;
      // Fetch Hebrew date
      const hebrewDateRes = await fetch(
        `https://www.hebcal.com/converter?cfg=json&date=${currentDate.toISOString().split("T")[0]}&g2h=1&strict=1`
      );
      console.log( `https://www.hebcal.com/converter?cfg=json&date=${currentDate.toISOString().split("T")[0]}&g2h=1&strict=1`);
      const hebrewDate = await hebrewDateRes.json();

      // Fetch orders from last week with "עליה" in the name
      const orders = await ordersCollection?.find({
        createdAt: { $gte: oneWeekAgo }
      }).toArray();

      if (!orders) {
        return reply.status(404).send({ msg: "No orders found" });
      }

      // Extract unique userIds
      const userIds = [...new Set(orders.map(order => new ObjectId(order.userId)))];
      const users = await usersCollection?.find({ _id: { $in: userIds } }).toArray();
      
      const userMap = users?.reduce((acc, user) => {
        if (user.firstName && user.lastName) {
          acc[user._id.toString()] = `${user.firstName} ${user.lastName}`;
        }
        return acc;
      }, {} as Record<string, string>);
      
      const ordersWithUserNames = orders.map((order) => {
        const filteredNames = order.name.filter((n: string) =>
          !n.includes("מנחה") && !n.includes("תפילה") &&
          (n.includes("עליה") || n.includes("תרגום") || n.includes("היכל") || n.includes("מפטיר"))
        );
      
        return {
          ...order,
          userName: userMap?.[order.userId.toString()],
          name: filteredNames
        };
      });

      // Define the desired order of 'עליה' names
      const splitOrders = orders.flatMap((order) => 
        order.name.map((aliya: string) => ({
          ...order,
          name: aliya, // Each aliya becomes a separate order
        }))
      );
      
      // Define the desired order of 'עליה' names
      const aliyaOrder = [
        "פתיחת היכל",
        "עליה-ראשון",
        "עליה-שני",
        "עליה-שלישי",
        "עליה-רביעי",
        "עליה-חמישי",
        "עליה-שישי",
        "עליה-שביעי",
        "מפטיר"
      ];
      
      // Rearrange orders according to the aliyaOrder
      const seenOrderIds = new Set<string>();

      // Rearrange orders according to the aliyaOrder
      const rearrangedOrders = aliyaOrder.flatMap((aliya) => {
        const order = splitOrders.find((o) => {
          const uniqueKey = `${o._id}-${o.name}`;
          if (o.name === aliya && !seenOrderIds.has(uniqueKey)) {
            seenOrderIds.add(uniqueKey); // Track this specific aliya of the order
            return true;
          }
          return false;
        });
        return order ? [order] : [];
      });

      // Create the final Shabbat object to send back
      const shabbatObj = {
        shabbatStart: data.items[0].date,
        shabbatEnd: data.items[2].date,
        hebrew: hebrewDate.hebrew,
        parasha: data.items[1].hebrew,
        orders: rearrangedOrders,
        hazan: Hazanim,
        book: WeeklyBooks[bookIndex]?.name
      };

      reply.status(200).send(shabbatObj);

    } catch (error) {
      console.error("Error:", error);
      reply.status(500).send({ msg: "An error occurred while processing your request" });
    }
  });
};

export default hebcalRoute;
