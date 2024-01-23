import { Flex, Tabs, TabsProps } from "antd";
import { FC, useEffect, useMemo, useState } from "react";
import { FormBuilderProps } from "../../../../form-builder/formBuilder";
import { useFormsDispatch, useFormsState } from "../../../../form-context";
import { setSession } from "../../../../form-context/form.actions";
import { SubmitHandler, FieldValues } from "../../../../form-controller";
import { MasterForm } from "../..";

type TabPosition = "left" | "right" | "top" | "bottom";

export interface TabBarFormProps {
  formId: string;
  schema: any;
  onChange?: (activeKey: string) => void;
  onSubmit: SubmitHandler<FieldValues>;
  tabPosition?: TabPosition;
  tabProps?: TabsProps
}

type TabBarType = TabBarFormProps & FormBuilderProps;

const TabBarForm: FC<TabBarType> = ({ formId, extraValidation, componentDidMount,
  componentDidUpdate, componentWillUnMount, defaultValues, dictionary, schema, onChange, onSubmit, tabPosition,tabProps, ...rest }) => {
  const dispatch = useFormsDispatch();
  const state = useFormsState() as any;
  const [key, setKey] = useState("0");
  const { sessionsById } = schema;

  useEffect(() => {
    const currentSessionIndex = state[formId]?.currentSessionIndex;
    if (currentSessionIndex) {
      setKey(currentSessionIndex.toString())
    }
  }, [state[formId]?.currentSessionIndex])

  const onChangeCallBack = (key: string) => {
    dispatch(setSession(formId, Number(key)))
    setKey(key);
  };

  const tabsItems: TabsProps['items'] = useMemo(() => {
    return sessionsById.map((sessionId, index) => {
      const { meta } = schema.sessions[sessionId];
      if (meta) {
        const { tab } = meta;
        return ({
          label: tab.label,
          disabled: tab.disabled,
          key: index.toString()
        })
      }
      else {
        throw new Error("Please config meta for session tab before using");
      }
    });
  }, [sessionsById, schema]);

  const tabs = (position?: TabPosition) => <Tabs
    tabPosition={position}
    items={tabsItems}
    activeKey={key}
    onChange={onChangeCallBack}
    {...tabProps} />;
    
  const form = () => <MasterForm extraValidation={extraValidation} componentDidUpdate={componentDidUpdate} defaultValues={defaultValues} componentDidMount={componentDidMount} componentWillUnMount={componentWillUnMount} dictionary={dictionary} formId={formId} schema={schema} onSubmit={onSubmit} {...rest} />;

  switch (tabPosition) {
    case "left":
      return <>
        <Flex>
          {tabs(tabPosition)}
          <div style={{ width: "100%" }}>
            {form()}
          </div>
        </Flex>
      </>
    case "right":
      return <>
        <Flex>
          <div style={{ width: "100%" }}>
            {form()}
          </div>
          {tabs(tabPosition)}
        </Flex>
      </>
    case "bottom":
      return <>
        {form()}
        {tabs(tabPosition)}
      </>
    default:
      return <>
        {tabs()}
        {form()}
      </>
  }
};

TabBarForm.defaultProps = {
  tabPosition: "top"
}

export default TabBarForm;