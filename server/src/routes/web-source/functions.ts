export const initializeOrdersIndexes = async (db: any) => {
  try {
    // Create an ascending index on createdAt
    await db.collection('orders').createIndex({ createdAt: 1 });

    // Create a compound index for name sorting
    await db.collection('orders').createIndex(
      { name: 1, createdAt: 1 },
      { collation: { locale: "simple", strength: 1 } } 
    );

    console.log("Indexes created successfully");
  } catch (error) {
    console.error("Error creating indexes:", error);
  }
};


export function getShabatEndTimes(items: any[]): string {
  const value = items.filter(item => item.title.includes("Havdalah")).map(item => item.date);
  return value[0]
}
export function getShabatStartTimes(items: any[]): string{
  const value = items.filter(item => item.title.includes("Candle")).map(item => item.date);
  return value[0]

}
export function getShabatParasha(items: any[]): string{
 const value =  items.filter(item => item.hebrew.includes("פרשת")).map(item => item.hebrew);
 return value[0]

}