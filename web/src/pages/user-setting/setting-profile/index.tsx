import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useFetchUserInfo,
  useSaveSetting,
  useSelectUserInfo,
} from '@/hooks/userSettingHook';
import {
  getBase64FromUploadFileList,
  getUploadFileListFromBase64,
  normFile,
} from '@/utils/fileUtil';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Divider,
  Form,
  Input,
  Select,
  Space,
  Spin,
  Upload,
  UploadFile,
} from 'antd';
import { TimezoneList } from '../constants';
import {
  useSelectSubmitUserInfoLoading,
  useSelectUserInfoLoading,
  useValidateSubmittable,
} from '../hooks';

import parentStyles from '../index.less';
import styles from './index.less';

const { Option } = Select;

const tailLayout = {
  wrapperCol: { offset: 20, span: 4 },
};

const UserSettingProfile = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'profile-setting' });
  const userInfo = useSelectUserInfo();
  const saveSetting = useSaveSetting();
  const submitLoading = useSelectSubmitUserInfoLoading();
  const { form, submittable } = useValidateSubmittable();
  const loading = useSelectUserInfoLoading();
  useFetchUserInfo();

  const onFinish = async (values: any) => {
    const avatar = await getBase64FromUploadFileList(values.avatar);
    saveSetting({ ...values, avatar });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    const fileList: UploadFile[] = getUploadFileListFromBase64(userInfo.avatar);
    form.setFieldsValue({ ...userInfo, avatar: fileList });
  }, [form, userInfo]);

  return (
    <section className={styles.profileWrapper}>
      <SettingTitle
        title={t("Profile")}
        description={t("Description")}
      ></SettingTitle>
      <Divider />
      <Spin spinning={loading}>
        <Form
          colon={false}
          name="basic"
          labelAlign={'left'}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ width: '100%' }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label={t("Username")}
            name="nickname"
            rules={[
              {
                required: true,
                message: t("Username Validation"),
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Divider />
          <Form.Item<FieldType>
            label={
              <div>
                <Space>{t("Your photo")}</Space>
                <div>{t("Photo Description")}</div>
              </div>
            }
            name="avatar"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              listType="picture-card"
              maxCount={1}
              accept="image/*"
              beforeUpload={() => {
                return false;
              }}
              showUploadList={{ showPreviewIcon: false, showRemoveIcon: false }}
            >
              <button style={{ border: 0, background: 'none' }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>{t("Upload")}</div>
              </button>
            </Upload>
          </Form.Item>
          <Divider />
          <Form.Item<FieldType>
            label={t("Color schema")}
            name="color_schema"
            rules={[
              { required: true, message: t("Color Schema Validation") },
            ]}
          >
            <Select placeholder={t("Color schema")}>
              <Option value="Bright">{t("Bright")}</Option>
              <Option value="Dark">{t("Dark")}</Option>
            </Select>
          </Form.Item>
          <Divider />
          <Form.Item<FieldType>
            label={t("Language")}
            name="language"
            rules={[{ required: true, message: t("Language Validation") }]}
          >
            <Select placeholder={t("Language")}>
              <Option value="English">{t("English")}</Option>
              <Option value="Chinese">{t("Chinese")}</Option>
            </Select>
          </Form.Item>
          <Divider />
          <Form.Item<FieldType>
            label={t("Timezone")}
            name="timezone"
            rules={[{ required: true, message: t("Timezone Validation") }]}
          >
            <Select placeholder={t("Timezone")} showSearch>
              {TimezoneList.map((x) => (
                <Option value={x} key={x}>
                  {x}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Divider />
          <Form.Item label={t("Email address")}>
            <Form.Item<FieldType> name="email" noStyle>
              <Input disabled />
            </Form.Item>
            <p className={parentStyles.itemDescription}>
              {t("Email Change Alert")}
            </p>
          </Form.Item>
          <Form.Item
            {...tailLayout}
            shouldUpdate={(prevValues, curValues) =>
              prevValues.additional !== curValues.additional
            }
          >
            <Space>
              <Button htmlType="button">{t("Cancel")}</Button>
              <Button
                type="primary"
                htmlType="submit"
                disabled={!submittable}
                loading={submitLoading}
              >
                {t("Save")}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Spin>
    </section>
  );
};

export default UserSettingProfile;