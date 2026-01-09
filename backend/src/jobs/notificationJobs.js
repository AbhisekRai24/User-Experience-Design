import cron from 'node-cron';
import Event from '../models/Event.js';
import { createReminderNotification } from '../controllers/notificationController.js';

// Run every day at 9:00 AM
export const scheduleReminderNotifications = () => {
    cron.schedule('0 9 * * *', async () => {
        console.log('\n🔔 Running reminder notification job at:', new Date().toISOString());

        try {
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);

            const dayAfterTomorrow = new Date(tomorrow);
            dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

            console.log('Checking events between:', tomorrow, 'and', dayAfterTomorrow);

            // Find all events happening in the next 24-48 hours
            const upcomingEvents = await Event.find({
                date: {
                    $gte: tomorrow,
                    $lt: dayAfterTomorrow,
                },
            });

            console.log(`Found ${upcomingEvents.length} upcoming events`);

            for (const event of upcomingEvents) {
                await createReminderNotification(event);
            }

            console.log('✓ Reminder notification job completed\n');
        } catch (error) {
            console.error('Error in reminder notification job:', error);
        }
    });

    console.log('✓ Reminder notification job scheduled (runs daily at 9:00 AM)');
};

// For testing: Run immediately (remove in production)
export const runReminderJobNow = async () => {
    console.log('\n🔔 Running reminder notification job NOW (manual trigger)');

    try {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        const dayAfterTomorrow = new Date(tomorrow);
        dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

        const upcomingEvents = await Event.find({
            date: {
                $gte: tomorrow,
                $lt: dayAfterTomorrow,
            },
        });

        console.log(`Found ${upcomingEvents.length} upcoming events`);

        for (const event of upcomingEvents) {
            await createReminderNotification(event);
        }

        console.log('✓ Manual reminder notification job completed\n');
    } catch (error) {
        console.error('Error in manual reminder job:', error);
    }
};