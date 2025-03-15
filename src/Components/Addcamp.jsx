import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import * as Yup from "yup";
import useAxiosPublic from "../Hooks/useAxiospublic";

const imageHostingKey = import.meta.env.VITE_IMAGE_KEY;
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const AddCamp = () => {
    const axiosPublic = useAxiosPublic();

    // Form initial values
    const initialValues = {
        campName: "",
        image: null,
        campFees: "",
        date: "",
        location: "",
        healthcareProfessionalName: "",
        participantCount: 0,
        description: "",
    };

    // Validation rules using Yup
    const validationSchema = Yup.object({
        campName: Yup.string().required("Camp Name is required"),
        image: Yup.mixed().required("An image is required"),
        campFees: Yup.number()
            .required("Camp Fees are required")
            .positive("Must be a positive number"),
        date: Yup.date().required("Date & Time are required"),
        location: Yup.string().required("Location is required"),
        healthcareProfessionalName: Yup.string().required(
            "Healthcare Professional Name is required"
        ),
        participantCount: Yup.number()
            .min(0, "Cannot be less than 0")
            .required("Participant Count is required"),
        description: Yup.string().required("Description is required"),
    });

    // Handles form submission
    const handleSubmit = async (values, actions) => {
        try {
            const formData = new FormData();
            formData.append("image", values.image);

            // Upload image first
            const imgResponse = await axiosPublic.post(imageHostingAPI, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (!imgResponse.data.success) {
                throw new Error("Image upload failed");
            }

            const campData = {
                ...values,
                image: imgResponse.data.data.url,
            };

            console.log("Final Camp Data:", campData);
            // TODO: Send `campData` to your backend

            fetch('https://medical-camp-server-nine.vercel.app/camps', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(campData)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    toast.success('Successfully submitted');
                })
            actions.resetForm(); // Reset form on success
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            actions.setSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 py-10">
            <div className="w-full max-w-4xl bg-white p-10 rounded-lg shadow-lg border border-gray-200">
                <Helmet>
                    <title>Medical Camp Pro | Add Camp</title>
                    <meta name="description" content="Add a new health camp to the platform" />
                </Helmet>

                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Add a New Health Camp</h2>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue, isSubmitting }) => (
                        <Form>
                            {/* Two Column Grid Layout */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField label="Camp Name" name="campName" type="text" />
                                <FileField label="Camp Image" name="image" setFieldValue={setFieldValue} />

                                <InputField label="Camp Fees ($)" name="campFees" type="number" />
                                <InputField label="Date & Time" name="date" type="datetime-local" />

                                <InputField label="Location" name="location" type="text" />
                                <InputField label="Healthcare Professional Name" name="healthcareProfessionalName" type="text" />

                                <InputField
                                    label="Participant Count"
                                    name="participantCount"
                                    type="number"
                                    value={0}
                                    disabled
                                />
                            </div>

                            {/* Full-width Text Area */}
                            <div className="mt-6">
                                <TextAreaField label="Description" name="description" />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full mt-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-300"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

// Input Field Component
const InputField = ({ label, name, type }) => (
    <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor={name}>
            {label}
        </label>
        <Field
            type={type}
            id={name}
            name={name}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
    </div>
);

// File Input Component
const FileField = ({ label, name, setFieldValue }) => (
    <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor={name}>
            {label}
        </label>
        <input
            type="file"
            id={name}
            onChange={(event) => setFieldValue(name, event.currentTarget.files[0])}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
    </div>
);

// Text Area Component
const TextAreaField = ({ label, name }) => (
    <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor={name}>
            {label}
        </label>
        <Field
            as="textarea"
            id={name}
            name={name}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
    </div>
);

export default AddCamp;
