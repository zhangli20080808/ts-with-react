import React from "react";
import { ModalProps } from "antd/lib/modal";
import { TableProps } from "antd/lib/table";
export interface AddIndicatorsAndCategory extends ModalProps {
  defaultSelectedKeys?: Array<React.Key>;
  placeholder?: string
}
// export interface IndicatorsModalProps {}
export interface Indicators {
  content: string;
  id: React.Key;
}
