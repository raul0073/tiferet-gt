export const WeeklyBooks = [
    {name: 'ספר של מנשה אשוואל ז"ל', week: 1},
    {name: 'ספר של  יהודה פלח ז"ל', week: 2},
    {name: 'ספר של יגאל ודני פנחס ז"ל', week: 3},
    {name: 'ספר של יפת בדני ז"ל', week: 4},
    {name: 'ספר של יוסף חדד ז"ל', week: 5},
    {name: 'ספר של יפת ויונה גדסי ז"ל', week: 6},
    {name: 'ספר של שמעון פנחס ז"ל', week: 7},
    {name: 'ספר של בניה ושדי ז"ל', week: 8},
    {name: 'ספר של נפתלי לוי ז"ל', week: 9},
    {name: 'ספר של שלום כהן ז"ל',  week: 10},
    {name: 'ספר של סעדיה ונעמה דמארי ז"ל',  week: 11},
    {name: 'ספר של לאה פאדל ובת שבע כהן ז"ל',  week: 12},
    {name: 'ספר של מזל בדני ז"ל',  week: 13},
    {name: 'ספר של בנימין שירי ושושנה בן מנשה ז"ל',  week: 14},
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
