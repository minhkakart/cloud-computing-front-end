import { useState } from "react";
import { useGlobalState } from "../../global";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import Button from "react-bootstrap/esm/Button";
import Spinner from "react-bootstrap/esm/Spinner";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import axios from "axios";

function CVTextDetection() {
    const [state] = useGlobalState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({ show: false, message: "" });

    const [uploadedUrl, setUploadedUrl] = useState([]);
    const [currentUrl, setCurrentUrl] = useState("");

    const [file, setFile] = useState(null);

    const status = ["Upload and process", "Uploading", "Processing"];
    const [statusIndex, setStatusIndex] = useState(0);

    const [textdetect, setTextdetect] = useState([]);

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const toggleShowError = () => setError({ show: !error.show, message: "" });

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", file);

        if (file.size > 3500000) {
            throw new Error("File size must be less than 3MB");
        }

        setStatusIndex(1);

        await axios.get(process.env.REACT_APP_API_DOMAIN + "/api/csrf-cookie");
        const response = await axios.post(
            process.env.REACT_APP_API_DOMAIN + "/api/upload_file",
            formData,
            {
                headers: {
                    Authorization: `Bearer ${state.token}`,
                },
            }
        );

        if (response.status === 200) {
            setUploadedUrl([...uploadedUrl, response.data.gcs_uri]);
            setCurrentUrl(response.data.gcs_uri);
            return response.data.gcs_uri;
        } else {
            console.log("error upload", response);
            throw new Error("Upload failed");
        }
    };

    const handleProcess = async (gcs_uri) => {
        setStatusIndex(2);
        await axios.get(process.env.REACT_APP_API_DOMAIN + "/api/csrf-cookie");
        const response = await axios.post(
            process.env.REACT_APP_API_DOMAIN +
                "/api/cloud-vision/text-detection",
            {
                gcs_uri,
            },
            {
                headers: {
                    Authorization: `Bearer ${state.token}`,
                    "Access-Control-Allow-Origin": "*",
                },
            }
        );

        if (response.status === 200) {
            setTextdetect(response.data.textdetect);
        } else {
            console.log("error process", response);
            throw new Error("Process failed");
        }
    };

    const handleSubmitProcess = async () => {
        setIsLoading(true);
        setTextdetect([]);
        try {
            await handleProcess(currentUrl);
        } catch (error) {
            console.log("error", error);
            setError({ show: true, message: error.message });
        } finally {
            setIsLoading(false);
            setStatusIndex(0);
        }
    };

    const handleUploadAndProcess = async () => {
        setIsLoading(true);
        setTextdetect([]);
        try {
            const gcs_uri = await handleUpload();
            await handleProcess(gcs_uri);
        } catch (error) {
            setError({ show: true, message: error.message });
        } finally {
            setIsLoading(false);
            setStatusIndex(0);
        }
    };

    return (
        <div>
            <h1>Detect Text in Image</h1>
            <div className="row">
                <div className="col-md-6 mt-4">
                    <div className="mb-3">
                        <input
                            type="file"
                            className="form-control"
                            name="file"
                            id="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            disabled={isLoading}
                        />
                    </div>
                    <Button
                        variant="primary"
                        onClick={handleUploadAndProcess}
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

                <div className="col-md-6 mt-4">
                    <Form.Select
                        value={currentUrl}
                        onChange={(e) => {
                            setCurrentUrl(e.target.value);
                        }}
                        aria-label="Default select example"
                        className="w-auto mb-3 mw-100">
                        {uploadedUrl.length === 0 && (
                            <option value="">No uploaded file</option>
                        )}
                        {uploadedUrl.map((url, index) => {
                            return (
                                <option key={index} value={url}>
                                    {url}
                                </option>
                            );
                        })}
                    </Form.Select>
                    <Button
                        variant="primary"
                        onClick={handleSubmitProcess}
                        disabled={isLoading || currentUrl === ""}>
                        {isLoading && (
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        )}{" "}
                        Process
                    </Button>
                </div>
            </div>
            <div className="d-flex flex-column mt-4">
                <Card>
                    <Card.Header>Result</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {textdetect.length === 0 && <p>No result</p>}
                            {textdetect.join(", ")}
                        </Card.Text>
                    </Card.Body>
                </Card>
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

export default CVTextDetection;
