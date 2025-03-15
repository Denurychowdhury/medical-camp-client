import { motion } from "framer-motion";
import dimage from '../assets/manageimage.png'
const VolunteerManagement = () => {
    return (
        <section className="bg-blue-50 py-16 px-8 md:px-24 flex flex-col md:flex-row items-center shadow-lg rounded-lg bg-[url('/path-to-background-image.jpg')] bg-cover bg-center">
            <div className="md:w-1/2 space-y-6 bg-white bg-opacity-90 p-6 rounded-lg">
                <motion.h2
                    className="text-4xl md:text-5xl font-bold text-blue-800"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Volunteer & Staff Management
                </motion.h2>
                <p className="text-gray-600 text-lg">
                    Streamline the process of recruiting, scheduling, and managing volunteers and staff to ensure the smooth operation of medical camps.
                </p>
                <ul className="space-y-3">
                    {[
                        "Effortless Volunteer Registration & Approval",
                        "Automated Shift Scheduling & Role Assignments",
                        "Attendance Tracking & Performance Monitoring",
                        "Secure Communication & Task Management",
                        "Multi-Camp Coordination & Resource Allocation",
                    ].map((item, index) => (
                        <motion.li
                            key={index}
                            className="text-blue-800 font-semibold text-lg border-l-4 border-blue-800 pl-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 }}
                        >
                            {item}
                        </motion.li>
                    ))}
                </ul>
            </div>
            <motion.div
                className="md:w-1/2 mt-6 md:mt-0 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <img src={dimage} alt="Volunteer Management" className="rounded-lg shadow-lg w-full max-w-sm md:max-w-md" />
            </motion.div>
        </section>
    );
};

export default VolunteerManagement;
