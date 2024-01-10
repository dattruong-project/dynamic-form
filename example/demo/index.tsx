import React from "react";
import { TabBarComponent, dictionary } from "../../src";
import { exampleForm } from "./constants";
import { schema } from "./schema";
import "./demo.css";

const DemoUI = () => {

    return (
        <TabBarComponent dictionary={dictionary} schema={schema} formId={exampleForm} onSubmit={(values) => {
            console.log(values)
        }}/>
    );
}

export default DemoUI;
