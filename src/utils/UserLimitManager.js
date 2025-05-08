// Function to check and update user's daily limit
export const CheckAndUpdateUserLimit = () => {
    const MAX_REQUESTS_PER_DAY = 20; // Max number of news requests per day
    const currentDate = new Date().toDateString();  // Get current day (as string to reset at midnight)
    const userLimit = JSON.parse(localStorage.getItem('userLimit')) || { count: 0, date: currentDate };

    // Reset the count if it's a new day
    if (userLimit.date !== currentDate) {
        localStorage.setItem('userLimit', JSON.stringify({ count: 1, date: currentDate }));
        return { allowed: true, remaining: MAX_REQUESTS_PER_DAY - 1 };
    }

    // If the user has exceeded the limit, block them
    if (userLimit.count >= MAX_REQUESTS_PER_DAY) {
        return { allowed: false, remaining: 0 };
    }

    // Otherwise, allow the request and increment the count
    userLimit.count += 1;
    localStorage.setItem('userLimit', JSON.stringify(userLimit));

    return { allowed: true, remaining: MAX_REQUESTS_PER_DAY - userLimit.count };
};
