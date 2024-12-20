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
export function handleShabatPrayerTimes(shabatStartTime: Date, shabatEnd: Date): { name: string; time: string }[] {
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
            name: "שיר השירים",
            time: calculateTime(shabatStartTime, -30) // Start time of Shabbat
        },
        {
            name: "מנחה ערב שבת",
            time: calculateTime(shabatStartTime, -15) // 20 minutes after Shabbat start
        },
        {
            name: "שחרית של שבת",
            time: "07:00" // Fixed time (can be made dynamic if required)
        },
        {
            name: "מנחה של שבת",
            time:  calculateTime(shabatEnd, +120)
        },
        {
            name: "סעודה שלישית",
            time:  calculateTime(shabatEnd, +150)
        },
        {
            name: "ערבית מוצאי שבת",
            // 25 hour after Shabbat start
            time: calculateTime(shabatEnd, -10)


        },
    ];
}
