import React from "react";
import { exampleForm } from "./constants";
import { schema } from "./schema";
import { TabBarForm, dictionary } from "../../src";
import "./demo.css";

const DemoUI = () => {

    return (
        <TabBarForm dictionary={dictionary} schema={schema} formId={exampleForm} onSubmit={(values) => {
            console.log(values)
        }}/>
    );
}

export default DemoUI;
