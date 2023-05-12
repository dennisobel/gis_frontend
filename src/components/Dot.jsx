import React, { useEffect, useState } from 'react';

const Dot = ({ color, label, index }) => {
    const [animationStyle, setAnimationStyle] = useState({});

    useEffect(() => {
        setAnimationStyle({ animation: 'blink 2s infinite' });
    }, []);

    return (
        <div
            style={{
                position: "absolute",
                top: `${10 + index * 20}px`,
                left: "10px",
                display: "flex",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    backgroundColor: color,
                    height: "10px",
                    width: "10px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    color: "#fff",
                    textTransform: "uppercase",
                    padding: "5px",
                }}
            >
                &nbsp;
            </div>
            <div
                className="label"
                style={{
                    ...animationStyle,
                    marginLeft: "5px",
                    fontSize: "0.6rem",
                    fontWeight: "bold",
                    color: "#ffd166",
                    textTransform: "uppercase",
                }}
            >
                {label}
            </div>
        </div>
    );
};

export default Dot;