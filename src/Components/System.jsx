const System = () => {
    return (
        <section className="bg-blue-50 py-12">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">Medical Camp Management System</h2>
                <p className="text-gray-600 text-center max-w-2xl mx-auto">
                    A streamlined solution for organizing and managing medical camps efficiently. From scheduling to participant tracking, we’ve got it all covered!
                </p>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-8 mt-10">
                    {/* Feature 1 */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-blue-600 mb-2">Camp Scheduling</h3>
                        <p className="text-gray-600">
                            Easily plan, update, and manage upcoming medical camps with a user-friendly dashboard.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-blue-600 mb-2">Healthcare Professional Management</h3>
                        <p className="text-gray-600">
                            Assign and manage healthcare professionals for each camp with real-time availability tracking.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-blue-600 mb-2">Participant Registration</h3>
                        <p className="text-gray-600">
                            Enable patients to register online and keep track of participant count for each camp.
                        </p>
                    </div>

                    {/* Feature 4 */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-blue-600 mb-2">Medical Records</h3>
                        <p className="text-gray-600">
                            Maintain detailed records of diagnoses, treatments, and follow-ups for every participant.
                        </p>
                    </div>

                    {/* Feature 5 */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-blue-600 mb-2">Location-Based Camp Search</h3>
                        <p className="text-gray-600">
                            Allow users to find nearby medical camps based on their location.
                        </p>
                    </div>

                    {/* Feature 6 */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-blue-600 mb-2">Real-Time Updates</h3>
                        <p className="text-gray-600">
                            Get instant notifications and updates about upcoming camps and schedule changes.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default System;
