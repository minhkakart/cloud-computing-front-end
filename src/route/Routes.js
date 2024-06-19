import { useRoutes } from "react-router-dom";
import DashBoard from "../components/DashBoard";
import Login from "../components/Login";
import Register from "../components/Register";
import AuthGuard from "../Guards/AuthGuard";
import GoongMap from "../components/GoongMap";
import UploadImage from "../components/UploadImage";
import HeaderLayout from "../components/HeaderLayout";
import CloudTranslate from "../components/cloud-translate/CloudTranslate";
import AuthenticatedRoute from "../components/auth/AuthenticatedRoute";
import DetectLanguage from "../components/cloud-translate/DetectLanguage";
import LabelDetection from "../components/VideoIntelligence/LabelDetection";
import FaceDetection from "../components/VideoIntelligence/FaceDetection";
import TextToSpeech from "../components/TextToSpeech/TextToSpeech";
import ExplicitContent from "../components/ExplicitContent";
import SpeechToText from "../components/SpeechToText";
import CVLabelDetection from "../components/CloudVision/CVLabelDetection";
import CVFaceDetection from "../components/CloudVision/CVFaceDetection";
import CVImagePropertyDetetion from "../components/CloudVision/CVImagePropertyDetetion";
import CVLogoDetection from "../components/CloudVision/CVLogoDetection";
import CVSafeSearchDetetion from "../components/CloudVision/CVSafeSearchDetetion";
import CVTextDetection from "../components/CloudVision/CVTextDetection";
import CVLandmarkDetection from "../components/CloudVision/CVLandmarkDetection";

function Routes() {
    return useRoutes([
        {
            path: "/",
            element: (
                <HeaderLayout>
                    <DashBoard />
                </HeaderLayout>
            ),
        },
        {
            path: "/",
            children: [
                {
                    path: "login",
                    element: <Login />,
                },
                {
                    path: "register",
                    element: <Register />,
                },
            ],
        },
        {
            path: "/map",
            element: (
                <AuthGuard>
                    <GoongMap />
                </AuthGuard>
            ),
        },
        {
            path: "/uploadimage",
            element: (
                <AuthGuard>
                    <UploadImage />
                </AuthGuard>
            ),
        },
        {
            path: "/cloud-translate",
            children: [
                {
                    path: "translate",
                    element: (
                        <AuthenticatedRoute
                            Element={CloudTranslate}
                            Layout={HeaderLayout}
                        />
                    ),
                },
                {
                    path: "detect-language",
                    element: (
                        <AuthenticatedRoute
                            Element={DetectLanguage}
                            Layout={HeaderLayout}
                        />
                    ),
                },
            ],
        },
        {
            path: "/video-intelligence",
            children: [
                {
                    path: "label-detection",
                    element: (
                        <AuthenticatedRoute
                            Element={LabelDetection}
                            Layout={HeaderLayout}
                        />
                    ),
                },
                {
                    path: "face-detection",
                    element: (
                        <AuthenticatedRoute
                            Element={FaceDetection}
                            Layout={HeaderLayout}
                        />
                    ),
                },
                {
                    path: "detect-explicit-content",
                    element: (
                        <AuthenticatedRoute
                            Element={ExplicitContent}
                            Layout={HeaderLayout}
                        />
                    ),
                },
            ],
        },
        {
            path: "/text-to-speech",
            element: (
                <AuthenticatedRoute
                    Element={TextToSpeech}
                    Layout={HeaderLayout}
                />
            ),
        },
        {
            path: "/speech-to-text",
            element: (
                <AuthenticatedRoute
                    Element={SpeechToText}
                    Layout={HeaderLayout}
                />
            ),
        },
        {
            path: "/cloud-vision",
            children: [
                {
                    path: "label-detection",
                    element: (
                        <AuthenticatedRoute
                            Element={CVLabelDetection}
                            Layout={HeaderLayout}
                        />
                    ),
                },
                {
                    path: "face-detection",
                    element: (
                        <AuthenticatedRoute
                            Element={CVFaceDetection}
                            Layout={HeaderLayout}
                        />
                    ),
                },
                {
                    path: "image-property-detection",
                    element: (
                        <AuthenticatedRoute
                            Element={CVImagePropertyDetetion}
                            Layout={HeaderLayout}
                        />
                    ),
                },
                {
                    path: "logo-detection",
                    element: (
                        <AuthenticatedRoute
                            Element={CVLogoDetection}
                            Layout={HeaderLayout}
                        />
                    ),
                },
                {
                    path: "save-search-detection",
                    element: (
                        <AuthenticatedRoute
                            Element={CVSafeSearchDetetion}
                            Layout={HeaderLayout}
                        />
                    ),
                },
                {
                    path: "text-detection",
                    element: (
                        <AuthenticatedRoute
                            Element={CVTextDetection}
                            Layout={HeaderLayout}
                        />
                    ),
                },
                {
                    path: "landmark-detection",
                    element: (
                        <AuthenticatedRoute
                            Element={CVLandmarkDetection}
                            Layout={HeaderLayout}
                        />
                    ),
                },
            ],
        },
    ]);
}

export default Routes;
