import React, { useCallback, useMemo, useState } from "react";
import { ModalProps } from "antd/lib/modal";
import { Icon, Input, Modal, Table } from "antd";
import { TableProps } from "antd/lib/table";
// import { useRequest } from "ahooks";
import { AddIndicatorsAndCategory, Indicators } from "../../types";
const getItems = (count: number) =>
  Array.from({ length: count }, (v, k) => k).map((k, index) => ({
    id: index,
    name: `item ${k}`,
    content: `item ${k}`,
  }));
const IndicatorsModal: React.FC<AddIndicatorsAndCategory> = (props) => {
  const { defaultSelectedKeys=[], placeholder = "", ...rest } = props;
  const [state, setState] = useState("");
  const modalProps = {
    width: 680,
    ...rest,
  };
  // const { data, loading } = useRequest(async () => {
  //   return getItems(30);
  // });
  const dataSource = useMemo(() => {
    return getItems(120).filter((item) => item.name.indexOf(state) !== -1);
  }, [state]);
  const tableProps: TableProps<Indicators> = {
    // loading,
    dataSource,
    columns: [
      { dataIndex: "name", title: "展示指标" },
      { dataIndex: "content", title: "描述" },
    ],
    scroll: { y: 400 },
    size: "small",
    style: { marginTop: 20 },
    bordered: false,
    pagination: false,
    rowSelection: {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
      },
      getCheckboxProps: (record) => ({
        disabled: defaultSelectedKeys.includes(record.id),
      }),
    },
    locale: {
      emptyText: <span>3234</span>,
    },
  };
  return (
    <Modal {...modalProps}>
      <Input.Search
        placeholder={placeholder}
        onSearch={(value) => setState(value)}
        allowClear
      />
      <Table {...tableProps} />
    </Modal>
  );
};
export default IndicatorsModal;
