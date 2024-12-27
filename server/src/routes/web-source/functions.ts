

export async function getShabbatData() {
  const url = `https://www.hebcal.com/shabbat?cfg=json&geonameid=294760&M=on`;
  const res = await fetch(url);
  if (!res.ok) return null;

  const data = await res.json();
  return {
    start: data.items[0]?.date,
    end: data.items[2]?.date,
    parasha: data.items[1]?.hebrew.includes("פרשת")
      ? data.items[1]?.hebrew
      : data.items[3]?.hebrew.includes("פרשת")
      ? data.items[3]?.hebrew
      : "לא נמצאה פרשה",
    prayerTimes: [], // Implement if required
  };
}

export function formatDateToIsraelTime(currentDate: Date, oneWeekAgo: Date) {
  const options: any = {
    timeZone: "Asia/Jerusalem",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const formatter = new Intl.DateTimeFormat("en-IL", options);
  return {
    currentDateIsrael: formatter.format(currentDate),
    oneWeekAgoIsrael: formatter.format(oneWeekAgo),
  };
}

export async function getHebrewDate(currentDate: Date) {
  const url = `https://www.hebcal.com/converter?cfg=json&date=${currentDate
    .toISOString()
    .split("T")[0]}&g2h=1&strict=1`;
  const res = await fetch(url);
  const data = await res.json();
  return data.hebrew;
}

export function processOrders(orders: any[], users: any[]) {
  const userMap = users?.reduce((acc, user) => {
    if (user.firstName && user.lastName) {
      acc[user._id.toString()] = `${user.firstName} ${user.lastName}`;
    }
    return acc;
  }, {} as Record<string, string>);

  const aliyaOrder = [
    "פתיחת היכל",
    "עליה-שלישי",
    "עליה-רביעי",
    "עליה-חמישי",
    "עליה-שישי",
    "עליה-שביעי",
    "מפטיר",
    "תרגום",
  ];

  const seenOrderIds = new Set<string>();
  const splitOrders = orders.flatMap((order) =>
    order.name.map((aliya: string) => ({
      ...order,
      name: aliya,
      userName: userMap?.[order.userId.toString()],
    }))
  );

  return aliyaOrder.flatMap((aliya) => {
    const order = splitOrders.find((o) => {
      const uniqueKey = `${o._id}-${o.name}`;
      if (o.name === aliya && !seenOrderIds.has(uniqueKey)) {
        seenOrderIds.add(uniqueKey);
        return true;
      }
      return false;
    });
    return order ? [order] : [];
  });
}

export function getShabbatWeekBook(currentDate: Date, weeklyBooks: any[]) {
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
  let weekNumber = Math.floor(
    ((currentDate.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24) + startOfYear.getDay() + 1) / 7
  );

  if (currentDate.getFullYear() === 2024 && currentDate.getMonth() === 11 && currentDate.getDate() === 27) {
    weekNumber = 4;
  }

  const bookIndex = weekNumber % weeklyBooks.length;
  return weeklyBooks[bookIndex]?.name;
}
