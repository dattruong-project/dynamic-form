import { FC } from "react";
import { FormFieldProps } from "../../../form-builder";
import { Card, Col, Row } from "antd";

type GridDefinition = {
   rows: [string];
   columns: [string]
}

interface CardComponentProps {
    onChange: (value: any) => void;
    options: [];
    error: any;
    defaultValue: any;
    gridDefinition?: GridDefinition
}

type CardType = CardComponentProps & FormFieldProps;

//TODO: Card
const CardComponent: FC<CardType> = ({
    onChange,
    disabledField,
    propRef,
    componentDidMount,
    componentDidUpdate,
    componentWillUnMount,
    ...rest
  }) => {
    return <>
      <Card>
        <Col span={24}>
        </Col>
        <Row>

        </Row>
      </Card>
    </>
}