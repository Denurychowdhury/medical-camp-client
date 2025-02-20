import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import useAxiosPublic from "../Hooks/useAxiospublic";
import { Helmet } from "react-helmet";

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
                    toast.success('successfully submited')
                })
            actions.resetForm(); // Reset form on success
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            actions.setSubmitting(false);
        }
    };

    return (
        <div className="flex-1 md:p-8 p-2">
            <div>
                <Helmet>
                    <title>Medical camp pro/Add camp</title>
                    <meta name="description" content="Nested component" />
                </Helmet>
            </div>
            <h2 className="text-xl font-bold mb-4">Add a New Health Camp</h2>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, isSubmitting }) => (
                    <Form className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
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
                        <TextAreaField label="Description" name="description" />

                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};


const InputField = ({ label, name, type }) => (
    <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2" htmlFor={name}>
            {label}
        </label>
        <Field type={type} id={name} name={name} className="w-full px-4 py-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500" />
        <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
    </div>
);


const FileField = ({ label, name, setFieldValue }) => (
    <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2" htmlFor={name}>
            {label}
        </label>
        <input
            type="file"
            id={name}
            onChange={(event) => setFieldValue(name, event.currentTarget.files[0])}
            className="w-full px-4 py-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
    </div>
);


const TextAreaField = ({ label, name }) => (
    <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2" htmlFor={name}>
            {label}
        </label>
        <Field as="textarea" id={name} name={name} className="w-full px-4 py-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500" />
        <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
    </div>
);

export default AddCamp;
