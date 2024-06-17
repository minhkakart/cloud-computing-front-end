import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import clsx from "clsx";
import getUserLocale from "get-user-locale";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import styles from "../scss/CloudTranslate.module.scss";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useGlobalState } from "../../global";
import Button from "react-bootstrap/Button";

function CloudTranslate() {
    const locale = getUserLocale().split("-")[0];

    const [state] = useGlobalState();
    const [listLanguage, setListLanguage] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({ show: false, message: "" });
    const [targetLanguage, setTargetLanguage] = useState(locale);

    const sourceLanguageRef = useRef(null);
    const translatedLanguageRef = useRef(null);

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
                setListLanguage(response.data);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [state.token]);

    const toggleShowError = () => setError({ show: !error.show, message: "" });

    const handleTranslate = () => {
        const source = sourceLanguageRef.current.textContent;
        const target = targetLanguage;
        setIsLoading(true);
        axios
            .get(process.env.REACT_APP_API_DOMAIN + "/api/csrf-cookie")
            .then(() => {
                axios
                    .post(
                        process.env.REACT_APP_API_DOMAIN +
                            "/api/cloud-translate/translate",
                        {
                            source,
                            target,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${state.token}`,
                            },
                        }
                    )
                    .then((res) => {
                        translatedLanguageRef.current.textContent =
                            res.data.text;
                    })
                    .catch((error) => {
                        console.log(error);
                        setError({
                            show: true,
                            message: error.message,
                        });
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
                setError({ show: true, message: error.message });
            });
    };

    return (
        <div>
            <h1>Cloud translate</h1>
            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="form-group">
                        <Form.Select
                            aria-label="Default select example"
                            className="w-auto"
                            disabled>
                            <option value="1">Auto detect</option>
                        </Form.Select>
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
                        <Form.Select
                            value={targetLanguage}
                            onChange={(e) => {
                                setTargetLanguage(e.target.value);
                            }}
                            aria-label="Default select example"
                            className="w-auto">
                            {listLanguage.map((lang) => {
                                return (
                                    <option key={lang.code} value={lang.code}>
                                        {lang.name}
                                    </option>
                                );
                            })}
                        </Form.Select>
                        <p
                            contentEditable="false"
                            className={clsx(
                                "form-control",
                                "mt-2",
                                styles.translateArea
                            )}
                            ref={translatedLanguageRef}
                            rows="5"></p>
                    </div>
                </div>
            </div>
            <Button
                variant="primary"
                onClick={handleTranslate}
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
                Translate
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

export default CloudTranslate;
