import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getEventById } from '../../api/events';
import EventVolunteers from '../../components/EventVolunteer';

const VolunteersPage = () => {
    const { id } = useParams();

    const { data: event } = useQuery({
        queryKey: ['event', id],
        queryFn: () => getEventById(id),
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-2">{event?.title}</h1>
            <p className="text-gray-600 mb-6">Manage registered volunteers</p>
            <EventVolunteers eventId={id} eventTitle={event?.title} />
        </div>
    );
};

export default VolunteersPage;