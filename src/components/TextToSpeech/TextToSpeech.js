// import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import clsx from "clsx";
// import getUserLocale from "get-user-locale";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import styles from "../scss/TextToSpeech.module.scss";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useGlobalState } from "../../global";
import Button from "react-bootstrap/Button";

function TextToSpeech() {
    // const locale = getUserLocale().split("-")[0];

    const [state] = useGlobalState();
    const [listLanguage, setListLanguage] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({ show: false, message: "" });

    const [audioContent, setAudioContent] = useState(null);

    const textInputRef = useRef(null);

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
                console.log(listLanguage);
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

    const handleProcess = () => {
        const source = textInputRef.current.textContent;
        setIsLoading(true);
        setAudioContent(null);
        axios
            .get(process.env.REACT_APP_API_DOMAIN + "/api/csrf-cookie")
            .then(() => {
                axios
                    .post(
                        process.env.REACT_APP_API_DOMAIN +
                            "/api/text-to-speech/",
                        {
                            text: source,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${state.token}`,
                                'Access-Control-Allow-Origin': '*',
                            },
                        }
                    )
                    .then((response) => {
                        console.log(response.data);
                        // setAudioContent(response.data.audioContent);
                    })
                    .catch((error) => {
                        console.log(error);
                        setError({ show: true, message: error.message });
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
                        <label>Text input</label>
                        <p
                            contentEditable="true"
                            className={clsx(
                                "form-control",
                                "mt-2",
                                styles.translateArea
                            )}
                            rows="5"
                            ref={textInputRef}></p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group d-flex flex-column">
                        <label>Result</label>
                        {audioContent && (
                            <div className="mt-3">
                                <audio
                                    id="audio"
                                    autobuffer="autobuffer"
                                    controls>
                                    <source
                                        src={
                                            "data:audio/wav;base64," +
                                            audioContent
                                        }
                                        type="audio/wav"
                                    />
                                </audio>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Button
                variant="primary"
                onClick={handleProcess}
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
                Process
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

export default TextToSpeech;
