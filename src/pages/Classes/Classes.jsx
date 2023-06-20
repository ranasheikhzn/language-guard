import Container from "../../components/Container/Container";
import SingleClass from "./SingleClass";
import useClasses from "../../hooks/useClasses";
import useThemeContext from "../../hooks/useThemeContext";
import { Helmet } from "react-helmet-async";

const Classes = () => {
    const [classes] = useClasses()
    const { theme } = useThemeContext()

    const approvedClasses = classes.filter(singleClass => singleClass.status === "approved")

    return (
        <section className="my-16">
            <Helmet>
                <title>Classes - Language Guard</title>
            </Helmet>
            <Container>
                <div className="text-center w-2/3 mx-auto space-y-4 mb-12">
                    <h2 className={`text-3xl font-bold ${theme === 'light' ? "text-gray-900" : "text-gray-100"}`}>All the Exciting Classes</h2>
                    <p className={`${theme === 'light' ? "text-gray-900" : "text-gray-400"}`}>Immerse Yourself in All the Exciting Classes and Expand Your Language Skills at Language Guard.</p>
                </div>
                
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {
                        approvedClasses.map(singleClass => <SingleClass
                        key={singleClass._id}
                        singleClass={singleClass}
                        ></SingleClass>)
                    }
                </div>
            </Container>
        </section>
    );
};

export default Classes;