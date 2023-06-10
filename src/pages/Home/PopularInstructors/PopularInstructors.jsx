import { useQuery } from "@tanstack/react-query";
import Instructor from "./Instructor";
import axios from "axios";

const PopularInstructors = () => {
    const { data: popularInstructors = [] } = useQuery({
        queryKey: ['popular-instructors'],
        queryFn: async () => {
            const res = await axios(`/popular-instructors`);
            return res.data;
        }
    })

    return (
        <div className="pt-10 pb-20">
            <div className="text-center w-2/3 mx-auto space-y-4 mb-10">
                <h2 className="text-3xl font-bold">Meet our top Instructors</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui autem quae explicabo, eveniet quasi perferendis rem commodi eum praesentium! Dolores ullam nostrum beatae a ducimus.</p>
            </div>

            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    popularInstructors.map(instructor => <Instructor
                    key={instructor._id}
                    instructor={instructor}
                    ></Instructor>)
                }
            </div>
        </div>
)};

export default PopularInstructors;