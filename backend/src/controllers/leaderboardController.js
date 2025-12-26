import User from '../models/User.js';

export const getTopAttendees = async (req, res) => {
    try {
        console.log('🔍 Getting top attendees...');
        const { period = 'month' } = req.query;

        // Calculate date range
        const now = new Date();
        const startDate = new Date();
        if (period === 'week') {
            startDate.setDate(now.getDate() - 7);
        } else {
            startDate.setMonth(now.getMonth() - 1);
        }

        // Get all users with their history - FILTER OUT ADMINS
        const usersWithHistory = await User.aggregate([
            {
                $match: {
                    role: 'USER' // 👈 Only get users with role 'USER', exclude 'ADMIN'
                }
            },
            {
                $lookup: {
                    from: 'eventhistories',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'eventHistory'
                }
            },
            {
                $project: {
                    username: 1,
                    fullName: 1,
                    profileImage: 1,
                    eventHistory: 1
                }
            }
        ]);

        console.log('👥 Found users (excluding admins):', usersWithHistory.length);

        // Calculate scores for each user
        const userScores = usersWithHistory.map(user => {
            let score = 0;
            const categories = new Set();
            const monthsActive = new Set();

            user.eventHistory.forEach(history => {
                const eventDate = new Date(history.joinedAt);

                // Base points for each event
                score += 10;

                // Recent activity bonus (last 30 days)
                const daysSinceEvent = (now - eventDate) / (1000 * 60 * 60 * 24);
                if (daysSinceEvent <= 30) {
                    score += 5;
                }

                // Donation points
                if (history.donation?.cash) {
                    score += Math.floor(history.donation.cash) * 3;
                }

                // Track categories for diversity bonus
                if (history.event?.category) {
                    categories.add(history.event.category);
                }

                // Track months for consistency bonus
                const monthYear = `${eventDate.getMonth()}-${eventDate.getFullYear()}`;
                monthsActive.add(monthYear);
            });

            // Diversity bonus
            score += categories.size * 2;

            // Consistency bonus (3+ consecutive months)
            if (monthsActive.size >= 3) {
                score += 10;
            }

            return {
                userId: user._id,
                username: user.username,
                fullName: user.fullName,
                profileImage: user.profileImage,
                score: score,
                eventsAttended: user.eventHistory.length,
                categoriesExplored: categories.size
            };
        });

        // Sort by score and get top 5
        const topAttendees = userScores
            .sort((a, b) => b.score - a.score)
            .slice(0, 5)
            .map((user, index) => ({
                ...user,
                rank: index + 1
            }));

        console.log('🏆 Top attendees:', topAttendees);

        res.json({
            period,
            topAttendees,
            generatedAt: new Date()
        });
    } catch (error) {
        console.error('❌ Get top attendees error:', error);
        console.error('Stack:', error.stack);
        res.status(500).json({ message: error.message, error: error.stack });
    }
};