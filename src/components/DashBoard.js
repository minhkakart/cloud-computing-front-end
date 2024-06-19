import clsx from "clsx";
import styles from "./scss/dashboard.module.scss";
import { Link } from "react-router-dom";

const DashBoard = () => {
    const listApis = [
        {
            name: "Cloud translation",
            description: "Text translation with AI technology",
            link: "/cloud-translate/translate",
        },
        {
            name: "Label Detection",
            description: "Label detection in video with AI technology",
            link: "/video-intelligence/label-detection",
        },
        {
            name: "Detect Language",
            description: "Detects the language of text within a request.",
            link: "/cloud-translate/detect-language",
        },
        {
            name: "Video Intelligence Face Detection",
            description: "Face detection in video with AI technology",
            link: "/video-intelligence/face-detection",
        },
        {
            name: "Text to Speech",
            description: "Convert text to speech with AI technology",
            link: "/text-to-speech",
        },
        {
            name: "Detect Explicit Content",
            description:
                "Detect explicit content in video with AI technology (pornography, violence, etc.)",
            link: "/video-intelligence/detect-explicit-content",
        },
        {
            name: "Speech to Text",
            description: "Convert speech to text with AI technology",
            link: "/speech-to-text",
        },
        {
            name: "Image Property Detection",
            description: "Detect properties of an image with AI technology",
            link: "/cloud-vision/image-property-detection",
        },
        {
            name: "Logo Detection",
            description: "Detect logos in an image with AI technology",
            link: "/cloud-vision/logo-detection",
        },
        {
            name: "Face Detection",
            description: "Detect faces in an image with AI technology",
            link: "/cloud-vision/face-detection",
        },
        {
            name: "Label Detection",
            description: "Detect labels in an image with AI technology",
            link: "/cloud-vision/label-detection",
        },
        {
            name: "Landmark Detection",
            description: "Detect landmarks in an image with AI technology",
            link: "/cloud-vision/landmark-detection",
        },
        {
            name: "Text Detection",
            description: "Detect text in an image with AI technology",
            link: "/cloud-vision/text-detection",
        },
        {
            name: "Safe Search Detection",
            description: "Detect safe search in an image with AI technology",
            link: "/cloud-vision/save-search-detection",
        },
    ];

    return (
        <div>
            <h1>Khu vực tải nghiệm các dịch vụ AI</h1>
            <div className="row mt-sm-3">
                {listApis.map((api, index) => (
                    <div key={index} className="col-md-4 mb-3">
                        <div className="card">
                            <div className={clsx("card-body", styles.cardBody)}>
                                <h5 className="card-title">{api.name}</h5>
                                <p className="card-text flex-grow-1">
                                    {api.description}
                                </p>
                                <Link to={api.link} className="btn btn-primary">
                                    Trải nghiệm
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashBoard;
