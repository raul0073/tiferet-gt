export const WeeklyBooks = [
    {name: "ספר 1", week: 1},
    {name: "ספר 2", week: 2},
    {name: "ספר 3", week: 3},
    {name: "ספר 4", week: 4},
    {name: "ספר 5", week: 5},
    {name: "ספר 6", week: 6},
    {name: "ספר 7", week: 7},
    {name: "ספר 8", week: 8},
    {name: "ספר 9", week: 9},
    {name: "ספר 10", week: 10},
    {name: "ספר 11", week: 11},
    {name: "ספר 12", week: 12},
    {name: "ספר 13", week: 13},
    {name: "ספר 14", week: 14},
]
export function handleShabatPrayerTimes(shabatStartTime: Date): { name: string; time: string }[] {
    // Ensure the input is a valid Date object
    if (!(shabatStartTime instanceof Date) || isNaN(shabatStartTime.getTime())) {
        throw new Error("Invalid shabatStartTime: Please provide a valid Date object.");
    }

    // Helper to calculate times based on an offset in minutes
    const calculateTime = (baseTime: Date, offsetMinutes: number): string => {
        const adjustedTime = new Date(baseTime.getTime() + offsetMinutes * 60000);
        return adjustedTime.toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" });
    };
    return [
        {
            name: "קבלת שבת",
            time: calculateTime(shabatStartTime, 0) // Start time of Shabbat
        },
        {
            name: "ערבית של שבת",
            time: calculateTime(shabatStartTime, 20) // 20 minutes after Shabbat start
        },
        {
            name: "שחרית של שבת",
            time: "08:30" // Fixed time (can be made dynamic if required)
        },
        {
            name: "קריאת התורה",
            time: "09:30" // Fixed time (can be made dynamic if required)
        },
        {
            name: "מוסף של שבת",
            time: "10:30" // Fixed time (can be made dynamic if required)
        },
        {
            name: "מנחה של שבת",
            time: calculateTime(shabatStartTime, 24 * 60 - 90) // 90 minutes before sunset
        },
        {
            name: "סעודה שלישית",
            time: calculateTime(shabatStartTime, 24 * 60 - 70) // 70 minutes before sunset
        },
        {
            name: "ערבית מוצאי שבת",
            time: calculateTime(shabatStartTime, 25 * 60) // 1 hour after Shabbat ends
        },
        {
            name: "הבדלה",
            time: calculateTime(shabatStartTime, 25 * 60 + 15) // 15 minutes after Maariv
        }
    ];
}
