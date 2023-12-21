import {rule, updateRule} from '@/services/ant-design-pro/api';
import type {ActionType, ProColumns,} from '@ant-design/pro-components';
import {useIntl} from '@umijs/max';
import {Button, Drawer, Form, message, Switch} from 'antd';
import React, { useRef, useState} from 'react';
import MonacoEditor from 'react-monaco-editor';
import dayjs from "dayjs";
import {
  ProTable,
  ProForm,
  ModalForm,
  PageContainer,
  ProFormSwitch,
  ProFormTextArea, ProFormText
} from '@ant-design/pro-components';
import {useFullscreen} from "ahooks";
import {FullscreenExitOutlined, FullscreenOutlined} from "@ant-design/icons";

const TableList: React.FC = () => {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [codeDetail, setCodeDetail] = useState<string>("");
  const [modalVisit, setModalVisit] = useState(false);
  const actionRef = useRef<ActionType>();
  const ref = useRef(null);
  const monacoEditor = useRef(null);
  const [isFullscreen, {toggleFullscreen}] = useFullscreen(ref);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: "id",
      dataIndex: 'id',
      search: false
    },
    {
      title: "有用",
      dataIndex: 'useful',
      valueType: 'switch',
      render(checked, row) {
        return <Switch checked={row.useful} onChange={function () {
          updateRule(row.id!, {useful: !row.useful}).then(res => {
            actionRef.current?.reload()
          })
        }}/>
      }
    },
    {
      title: "url",
      dataIndex: 'url',
      search: false
    },
    {
      title: "加密代码",
      dataIndex: 'encode',
      search: false,
      renderText(code) {
        return <Button type="link" onClick={() => {
          setCodeDetail(code)
          setShowDetail(true)
        }}>点击查看</Button>
      }
    },
    {
      title: "解密代码",
      dataIndex: 'decode',
      search: false,
      renderText(code) {
        return <Button type="link" onClick={() => {
          setCodeDetail(code)
          setShowDetail(true)
        }}>点击查看</Button>
      }
    },
    {
      title: "备注",
      search: false,
      dataIndex: 'note',
    },
    {
      title: "创建时间",
      search: false,
      dataIndex: 'createTime',
      renderText(time) {
        return dayjs(time).format("YYYY-MM-DD HH:mm:ss")
      }
    },
    {
      title: "操作",
      search: false,
      dataIndex: 'action',
      fixed: "right",
      render(node, item) {
        return <Button type="link" onClick={() => {
          setModalVisit(true)
          form.setFieldsValue(item)
        }}>编辑</Button>
      }
    }
  ];

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry form',
        })}
        scroll={{x: 'max-content'}}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={rule}
        columns={columns}
      />
      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setShowDetail(false);
        }}
        closable={false}
      >
        <div style={{height: "100%", width: "100%", padding: 20}} ref={ref}>
          <div style={{textAlign: "right"}}>
            <Button icon={isFullscreen ? <FullscreenExitOutlined/> : <FullscreenOutlined/>} onClick={() => {
              toggleFullscreen()
              // @ts-ignore
              setTimeout(() => monacoEditor.current?.layout(),250)
            }}/>
          </div>
          <MonacoEditor
            editorDidMount={(editor) => {
              // @ts-ignore
              monacoEditor.current = editor
            }}
            language="javascript"
            theme="vs-dark"
            value={codeDetail}
          />
        </div>
      </Drawer>
      <ModalForm<{
        name: string;
        company: string;
      }>
        form={form}
        open={modalVisit}
        autoFocusFirstInput
        onOpenChange={setModalVisit}
        modalProps={{destroyOnClose: true}}
        onFinish={async (values: any) => {
          console.log(values)
          await updateRule(values.id!, {useful: values.useful, note: values.note})
          message.success('提交成功');
          actionRef.current?.reload()
          return true;
        }}
      >
        <ProForm.Group>
          <ProFormText
            hidden={true}
            name="id"
          />
          <ProFormTextArea
            name="note"
            label="备注"
          />
          <ProFormSwitch
            name="useful"
            label="有用"
          />
        </ProForm.Group>
      </ModalForm>
    </PageContainer>
  );
};

export default TableList;
