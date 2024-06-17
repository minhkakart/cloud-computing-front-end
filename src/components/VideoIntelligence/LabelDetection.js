import { useState } from "react";
import axios from "axios";
import { useGlobalState } from "../../global";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import Button from "react-bootstrap/esm/Button";
import Spinner from "react-bootstrap/esm/Spinner";

function LabelDetection() {
    const [state] = useGlobalState();

    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({ show: false, message: "" });

    const status = ["Upload and process", "Uploading", "Processing"];
    const [statusIndex, setStatusIndex] = useState(0);

    const [labelResults, setLabelResults] = useState([]);

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const toggleShowError = () => setError({ show: !error.show, message: "" });

    const handleUpload = async () => {
        console.log(file);
        const formData = new FormData();
        formData.append("file", file);
        try {
            setIsLoading(true);
            setStatusIndex(1);
            axios
                .get(process.env.REACT_APP_API_DOMAIN + "/api/csrf-cookie")
                .then(() => {
                    axios
                        .post(
                            process.env.REACT_APP_API_DOMAIN +
                                "/api/upload_file",
                            formData,
                            {
                                headers: {
                                    Authorization: `Bearer ${state.token}`,
                                },
                            }
                        )
                        .then((response) => {
                            console.log(response);
                            setStatusIndex(2);
                            axios
                                .post(
                                    process.env.REACT_APP_API_DOMAIN +
                                        "/api/video-intelligence/detect-labels",
                                    {
                                        gcs_uri: response.data.gcs_uri,
                                    },
                                    {
                                        headers: {
                                            Authorization: `Bearer ${state.token}`,
                                        },
                                    }
                                )
                                .then((response) => {
                                    console.log(response);
                                    setLabelResults(
                                        response.data.anotation_results
                                    );
                                })
                                .catch((error) => {
                                    console.log(error);
                                    setIsLoading(false);
                                    setError({
                                        show: true,
                                        message: error.message,
                                    });
                                })
                                .finally(() => {
                                    setIsLoading(false);
                                    setStatusIndex(0);
                                });
                        })
                        .catch((error) => {
                            console.log(error);
                            setIsLoading(false);
                            setError({
                                show: true,
                                message: error.message,
                            });
                        });
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoading(false);
                    setError({
                        show: true,
                        message: error.message,
                    });
                });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="container">
            <h1>Video Intelligence Label Detection</h1>
            <div className="mt-4">
                <div className="mb-3">
                    <input
                        type="file"
                        className="form-control"
                        name="file"
                        id="file"
                        onChange={handleFileChange}
                        disabled={isLoading}
                    />
                </div>
                <Button
                    variant="primary"
                    onClick={handleUpload}
                    disabled={isLoading || !file}>
                    {isLoading && (
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                    )}{" "}
                    {status[statusIndex]}
                </Button>
            </div>

            <div className="mt-4">
                <h3>Result</h3>
                {labelResults.map((item, index) => {
                    return (
                        <div className="row" key={index}>
                            <ul>
                                <li>
                                    Frame labels:{" "}
                                    {item.frame_labels?.reduce((prev, curr) => {
                                        return prev + curr + ", ";
                                    }, "")}
                                </li>
                                <li>
                                    Segment labels:{" "}
                                    {item.segment_labels?.reduce(
                                        (prev, curr) => {
                                            return prev + curr + ", ";
                                        },
                                        ""
                                    )}
                                </li>
                                <li>
                                    Shot labels:{" "}
                                    {item.shot_labels?.reduce((prev, curr) => {
                                        return prev + curr + ", ";
                                    }, "")}
                                </li>
                            </ul>
                        </div>
                    );
                })}
            </div>

            <ToastContainer
                className="p-3"
                position="bottom-end"
                style={{ zIndex: 1 }}>
                <Toast
                    bg="danger"
                    show={error.show}
                    onClose={toggleShowError}
                    delay={3000}
                    autohide>
                    <Toast.Header>
                        <strong className="me-auto">Error</strong>
                        <small>Now</small>
                    </Toast.Header>
                    <Toast.Body className="text-white">
                        {error.message}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
}

export default LabelDetection;
