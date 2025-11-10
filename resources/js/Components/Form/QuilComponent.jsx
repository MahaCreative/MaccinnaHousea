import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuillCompnent = ({ height = "300px", errors, ...props }) => {
    // Konfigurasi Toolbar
    const modules = {
        toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline"], // Text formatting
            [{ color: [] }, { background: [] }], // Text color and background color
            ["blockquote", "code-block"], // Blockquote and Code Block
            [{ list: "ordered" }, { list: "bullet" }], // Lists
            [{ indent: "-1" }, { indent: "+1" }], // Indentation
            [{ align: [] }], // Text alignment
            ["clean"], // Remove formatting
        ],
    };

    const formats = [
        "font",
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "color",
        "background",
        "script",
        "blockquote",
        "code-block",
        "list",
        "bullet",
        "indent",
        "align",
        "link",
        "image",
        "video",
    ];

    return (
        <>
            {errors && <p className="text-red-500 italic">{errors}</p>}
            <ReactQuill
                {...props}
                theme="snow"
                modules={modules}
                formats={formats}
                style={{ height: height }}
            />
        </>
    );
};

export default QuillCompnent;
