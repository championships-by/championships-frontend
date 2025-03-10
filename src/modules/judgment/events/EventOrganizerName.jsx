import { Typography, Select, Flex, Button, Modal, Input, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import { SolutionOutlined, PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { eventApi } from "@api";

function EventOrganizerName({ name, value, eventId, form, onChange }) {
  const { t } = useTranslation();
  const [organizers, setOrganizers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrganizers, setSelectedOrganizers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOrganizerName, setNewOrganizerName] = useState("");

  const rules = {
    required: true,
    message: t("COMMON.ORGANIZER_NAME_REQUIRED"),
  };

  const fetchAllOrganizers = async () => {
    setLoading(true);
    try {
      const response = await eventApi.getOrganizers();
      setOrganizers(response.map((org) => org.name) || []);
    } finally {
      setLoading(false);
    }
  };

  const fetchEventOrganizers = async () => {
    if (!eventId) return;

    const response = await eventApi.getOrganizersRelatedToEvent(eventId);
    const organizerNames = response.map((org) => org.name);

    setSelectedOrganizers(organizerNames);
    form.setFieldsValue({ [name]: organizerNames });
    if (onChange) onChange({ [name]: organizerNames });
  };

  const createNewOrganizer = async () => {
    if (!newOrganizerName.trim()) {
      message.error(t("COMMON.ORGANIZER_NAME_REQUIRED"));
      return;
    }

    try {
      await eventApi.createOrganizer(newOrganizerName.trim());
      await fetchAllOrganizers();

      const newOrganizer = newOrganizerName.trim();
      const updatedSelected = [...selectedOrganizers, newOrganizer];
      setSelectedOrganizers(updatedSelected);
      form.setFieldsValue({ [name]: updatedSelected });
      if (onChange) onChange({ [name]: updatedSelected });

      message.success(t("MESSAGES.ORGANIZER_CREATED_SUCCESS"));
      setNewOrganizerName("");
      setIsModalOpen(false);
    } catch (error) {
      message.error(t("COMMON.ORGANIZER_CREATION_FAILED"));
    }
  };

  useEffect(() => {
    fetchAllOrganizers();
    if (eventId) fetchEventOrganizers();
  }, [eventId]);

  useEffect(() => {
    if (!eventId && value) {
      const organizerNames = Array.isArray(value)
        ? value
            .map((org) => (typeof org === "string" ? org : org.name))
            .filter(Boolean)
        : [];
      if (
        JSON.stringify(organizerNames) !== JSON.stringify(selectedOrganizers)
      ) {
        setSelectedOrganizers(organizerNames);
        form.setFieldsValue({ [name]: organizerNames });
      }
    }
  }, [value, name, form, eventId]);

  const handleChange = (selectedValues) => {
    setSelectedOrganizers(selectedValues);
    form.setFieldsValue({ [name]: selectedValues });
    if (onChange) onChange({ [name]: selectedValues });
  };

  const handleCreateClick = () => {
    setIsModalOpen(true);
  };

  const dropdownRender = (menu) => (
    <div>
      {menu}
      <div>
        <Button type="link" icon={<PlusOutlined />} onClick={handleCreateClick}>
          {t("COMMON.CREATE_NEW_ORGANIZER")}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <FormItem name={name} hasFeedback validateFirst rules={[rules]}>
        <Flex vertical>
          <Typography.Text>{t("COMMON.ORGANIZER_NAME")}</Typography.Text>
          <Select
            mode="multiple"
            value={selectedOrganizers}
            onChange={handleChange}
            loading={loading}
            placeholder={t("COMMON.ENTER_ORGANIZER_NAME")}
            allowClear
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            prefix={<SolutionOutlined />}
            className="events__organizer_name__input"
            dropdownRender={dropdownRender}
          >
            {organizers.map((organizer) => (
              <Select.Option
                key={organizer}
                value={organizer}
                label={organizer}
              >
                {organizer}
              </Select.Option>
            ))}
          </Select>
        </Flex>
      </FormItem>

      <Modal
        title={t("COMMON.CREATE_NEW_ORGANIZER")}
        open={isModalOpen}
        onOk={createNewOrganizer}
        onCancel={() => {
          setIsModalOpen(false);
          setNewOrganizerName("");
        }}
        okText={t("COMMON.SAVE")}
        cancelText={t("COMMON.CANCEL")}
      >
        <Input
          value={newOrganizerName}
          onChange={(e) => setNewOrganizerName(e.target.value)}
          placeholder={t("COMMON.ENTER_ORGANIZER_NAME")}
        />
      </Modal>
    </>
  );
}

export default EventOrganizerName;
