import Spinner from "react-bootstrap/Spinner";
import clsx from "clsx";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import styles from "../scss/DetectLanguage.module.scss";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useGlobalState } from "../../global";
import Button from "react-bootstrap/Button";

function DetectLanguage() {
    const [state] = useGlobalState();

    const [listLanguage, setListLanguage] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({ show: false, message: "" });

    const sourceLanguageRef = useRef(null);
    const detectedRef = useRef(null);

    const toggleShowError = () => setError({ show: !error.show, message: "" });

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(
                process.env.REACT_APP_API_DOMAIN +
                    "/api/cloud-translate/list-language",
                {
                    headers: {
                        Authorization: `Bearer ${state.token}`,
                    },
                }
            )
            .then((response) => {
                // console.log(response.data);
                setListLanguage(response.data);
            })
            .catch((error) => {
                console.error(error);
                setError({
                    show: true,
                    message: error.response.data.message,
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [state.token]);

    const handleDetect = () => {
        setIsLoading(true);
        const source = sourceLanguageRef.current.textContent;
        detectedRef.current.textContent = "Detecting...";
        axios
            .get(process.env.REACT_APP_API_DOMAIN + "/api/csrf-cookie")
            .then(() => {
                axios
                    .post(
                        process.env.REACT_APP_API_DOMAIN +
                            "/api/cloud-translate/detect-language",
                        {
                            source,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${state.token}`,
                            },
                        }
                    )
                    .then((res) => {
                        // console.log(res.data);
                        const detected =  listLanguage?.find((item) => {
                            if (item.code === res.data.languageCode.split('-')[0]) {
                                return true;
                            }
                            return false;
                        });
                        detectedRef.current.textContent = detected?.name ? detected?.name : 'Unknown';
                    })
                    .catch((error) => {
                        console.log(error);
                        setError({
                            show: true,
                            message: error.response.data.message,
                        });
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
                setError({ show: true, message: error.response.data.message });
            });
    };

    return (
        <div>
            <h1>Detect Language</h1>
            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="fs-3">Source</label>
                        <p
                            contentEditable="true"
                            className={clsx(
                                "form-control",
                                "mt-2",
                                styles.translateArea
                            )}
                            rows="5"
                            ref={sourceLanguageRef}></p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                    <label className="fs-3">Result</label>
                        <p
                            contentEditable="false"
                            className={clsx(
                                "form-control",
                                "mt-2",
                                styles.translateArea
                            )}
                            ref={detectedRef}
                            rows="5"></p>
                    </div>
                </div>
            </div>
            <Button
                variant="primary"
                onClick={handleDetect}
                disabled={isLoading}>
                {isLoading && (
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                )}{" "}
                Detect
            </Button>
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

export default DetectLanguage;
