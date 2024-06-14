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
            name: "Cloud Video Intelligence",
            description:
                "Detects objects, explicit content, and scene changes in videos. It also specifies the region for…",
            link: "#",
        },
        {
            name: "Vertex AI",
            description:
                "Train high-quality custom machine learning models with minimal machine learning expertise and…",
            link: "#",
        },
        {
            name: "Cloud Speech-to-Text",
            description: "Speech recognition",
            link: "#",
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
