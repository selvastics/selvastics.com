import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const DynamicMarkdown = () => {
  const [mdContent, setMdContent] = useState("");

  useEffect(() => {
    fetch("blogarticles/guide_participant_report.md")
      .then((response) => response.text())
      .then((md) => {
        setMdContent(md);
      });
  }, []);

  return <ReactMarkdown>{mdContent}</ReactMarkdown>;
};

