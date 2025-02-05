// import React, { useState, useEffect } from 'react';
// import { Table, Button, Modal, Input, Form, message } from 'antd';
// import axios from 'axios';
// import PaymentModal from './PaymentModal';
// import ServerPurchaseModal from './ServerPurchaseModal';
// import DomainClaimModal from './DomainClaimModal';
// import DomainMailVerificationModal from './DomainMailVerificationModal';
// import WebsiteUploadedModal from './WebsiteUploadedModal';
// import PaymentGatewayModal from './PaymentGatewayModal';
// import Ready2HandoverModal from './Ready2HandoverModal';
// import Stage3CompletionModal from './Stage3CompletionModal';

// const apiUrl = process.env.REACT_APP_BACKEND_URL;

// const Stage3website = (record) => {
//   const [data, setData] = useState([]);
//   const [isIdPassModalVisible, setIsIdPassModalVisible] = useState(false);
//   const [form] = Form.useForm();
//   const [currentRecord, setCurrentRecord] = useState(null);

// const [visibleModal, setVisibleModal] = useState(null);
// const [selectedRecord, setSelectedRecord] = useState(null);

// const openModal = (modalType, record) => {
// setSelectedRecord(record);
// setVisibleModal(modalType);
// };

// const closeModal = () => setVisibleModal(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const managerId = localStorage.getItem("managerId");
//       if (!managerId) {
//         throw new Error("Manager ID not found in local storage");
//       }

//       const response = await axios.get(`${apiUrl}/api/contact/getall?managerId=${managerId}`);
//       if (response.status !== 200) {
//         throw new Error(`Failed to fetch data: Status code ${response.status}`);
//       }

//       // Process data
//       const processedData = response.data.map((item) => ({
//         ...item,
//         simpleStatus: {
//           serverPurchase: item.serverPurchase?.startsWith('Done') ? 'Done' : 'Not Done',
//           domainMailVerification: item.domainMailVerification?.startsWith('Done') ? 'Done' : 'Not Done',
//           websiteUploaded: item.websiteUploaded?.startsWith('Done') ? 'Done' : 'Not Done',
//           readyToHandover: item.readyToHandover?.startsWith('Done') ? 'Done' : 'Not Done',
//           stage3Completion: item.stage3Completion?.startsWith('Done') ? 'Done' : 'Not Done',
//         }
//       }));

//       // Filter and sort data by enrollmentId in descending order
//       const filteredData = processedData
//         .filter(item => item.stage2Completion?.startsWith('Done') && !item.archive?.startsWith('true'))
//         .sort((a, b) => b.enrollmentId.localeCompare(a.enrollmentId));

//       // Set filtered data to state
//       setData(filteredData);

//     } catch (error) {
//       console.error("Error fetching data:", error);
//       message.error("Failed to fetch data");
//     }
//   };

//   const handleOpenIdPassModal = (record) => {
//     setCurrentRecord(record);
//     form.setFieldsValue({
//       id: record.idAndPassWebsite?.id || '',
//       pass: record.idAndPassWebsite?.pass || ''
//     });
//     setIsIdPassModalVisible(true);
//   };

//   const handleIdPassModalOk = async (values) => {
//     try {
//       await axios.put(`${apiUrl}/api/contact/${currentRecord._id}`, {
//         idAndPassWebsite: {
//           id: values.id,
//           pass: values.pass
//         }
//       });
//       message.success("ID and Password updated successfully");
//       setIsIdPassModalVisible(false);
//       fetchData();
//     } catch (error) {
//       message.error("Failed to update ID and Password");
//     }
//   };

//   const handleIdPassModalCancel = () => {
//     setIsIdPassModalVisible(false);
//     setCurrentRecord(null);
//   };

//   const serverColumns = [
//     {
//       title: "Enrollment ID",
//       dataIndex: "enrollmentId",
//       key: "enrollmentId",
//       fixed: 'left',
//       width: 100,
//     },
//     {
//       title: "Stage 3 Payment",
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record?.payment?.stage3?.status === "Done" ? '#90EE90' : undefined }}  // Light green hex code
//           onClick={() => openModal('payment', record)}
//         >
//           Edit Payment
//         </Button>
//       ),
//     },
//     {
//       title: "Server Purchase",
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record?.serverPurchase === 'Done' ? '#90EE90' : undefined }}  // Light green hex code
//           onClick={() => openModal('server', record)}
//         >
//           Server Purchase
//         </Button>
//       ),
//     },
//     {
//       title: "Domain Claim",
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record?.domainClaim ? '#90EE90' : undefined }}  // Light green if selectedTheme has a value
//           onClick={() => openModal('domainclaim', record)}
//         >
//           Domain Claim
//         </Button>
//       ),
//     },
//     {
//       title: "Domain Mail Verification",
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record?.domainMailVerification === 'Done' ? '#90EE90' : undefined }}  // Light green hex code
//           onClick={() => openModal('domainmail', record)}
//         >
//           Domain Mail Verification
//         </Button>
//       ),
//     },
//     {
//       title: "Website Uploaded",
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record?.websiteUploaded === 'Done' ? '#90EE90' : undefined }}  // Light green hex code
//           onClick={() => openModal('websiteuploaded', record)}
//         >
//           Website Uploaded
//         </Button>
//       ),
//     },
//     {
//       title: "ID & Pass",
//       dataIndex: "idAndPassWebsite",
//       key: "idAndPassWebsite",
//       width: 100,
//       render: (text, record) => (
//         <div>
//           {record.idAndPassWebsite?.id ? (
//             <div onClick={() => handleOpenIdPassModal(record)} style={{ cursor: "pointer", color: "#1890ff" }}>
//               <p><strong>ID:</strong> {record.idAndPassWebsite.id}</p>
//               <p><strong>Pass:</strong> {record.idAndPassWebsite.pass}</p>
//             </div>
//           ) : (
//             <Button onClick={() => handleOpenIdPassModal(record)}>
//               Set ID & Pass
//             </Button>
//           )}
//         </div>
//       ),
//     },
//     {
//       title: "Payment Gateway",
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record?.paymentGateway ? '#90EE90' : undefined }}  // Light green if selectedTheme has a value
//           onClick={() => openModal('paymentgateway', record)}
//         >
//           Payment Gateway
//         </Button>
//       ),
//     },
//     {
//       title: "Ready To Handover",
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record?.readyToHandover === 'Done' ? '#90EE90' : undefined }}  // Light green hex code
//           onClick={() => openModal('ready2handover', record)}
//         >
//           Ready To Handover
//         </Button>
//       ),
//     },
//     {
//       title: "Stage 3 Completion",
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record?.stage3Completion === 'Done' ? '#90EE90' : undefined }}  // Light green hex code
//           onClick={() => openModal('stage3completion', record)}
//         >
//           Stage 3 Completion
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <>

//       <div style={{ maxHeight: '1000px', overflowY: 'auto' }}>
//       <Table columns={serverColumns} dataSource={data} rowKey="_id" scroll={{ x: 'max-content', y: 601 }} sticky />
//     </div>

//       {/* payment modal */}

//       {visibleModal === 'payment' && (
//         <PaymentModal
//           visible={true}
//           onCancel={closeModal}
//           record={selectedRecord}
//           fetchData={fetchData}
//         />
//       )}

//       {/* server purchase modal */}

// {visibleModal === 'server' && (
//         <ServerPurchaseModal
//           visible={true}
//           onCancel={closeModal}
//           record={selectedRecord}
//           fetchData={fetchData}
//         />
//       )}

//       {/* domain claim modal */}

// {visibleModal === 'domainclaim' && (
//         <DomainClaimModal
//           visible={true}
//           onCancel={closeModal}
//           record={selectedRecord}
//           fetchData={fetchData}
//         />
//       )}

//       {/* domain mail verification */}

// {visibleModal === 'domainmail' && (
//         <DomainMailVerificationModal
//           visible={true}
//           onCancel={closeModal}
//           record={selectedRecord}
//           fetchData={fetchData}
//         />
//       )}

//     {/* website uploaded modal */}

// {visibleModal === 'websiteuploaded' && (
//         <WebsiteUploadedModal
//           visible={true}
//           onCancel={closeModal}
//           record={selectedRecord}
//           fetchData={fetchData}
//         />
//       )}

// {/* payment gateway modal */}

// {visibleModal === 'paymentgateway' && (
//         <PaymentGatewayModal
//           visible={true}
//           onCancel={closeModal}
//           record={selectedRecord}
//           fetchData={fetchData}
//         />
//       )}

// {/* ready to handover modal */}

// {visibleModal === 'ready2handover' && (
//         <Ready2HandoverModal
//           visible={true}
//           onCancel={closeModal}
//           record={selectedRecord}
//           fetchData={fetchData}
//         />
//       )}

// {/* stage 3 completion modal */}

// {visibleModal === 'stage3completion' && (
//         <Stage3CompletionModal
//           visible={true}
//           onCancel={closeModal}
//           record={selectedRecord}
//           fetchData={fetchData}
//         />
//       )}

// {/* id and pass modal */}
//       <Modal
//         title="Set ID & Pass"
//         open={isIdPassModalVisible}
//         onOk={() => form.submit()}
//         onCancel={handleIdPassModalCancel}
//       >
//         <Form form={form} onFinish={handleIdPassModalOk}>
//           <Form.Item
//             label="ID"
//             name="id"
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Password"
//             name="pass"
//           >
//             <Input.Password />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </>
//   );
// };

// export default Stage3website;

import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Input,
  Form,
  message,
  Select,
  Badge,
  List,
} from "antd";
import axios from "axios";
import moment from "moment";
import PaymentModal from "./PaymentModal";
import ServerPurchaseModal from "./ServerPurchaseModal";
import DomainClaimModal from "./DomainClaimModal";
import DomainMailVerificationModal from "./DomainMailVerificationModal";
import WebsiteUploadedModal from "./WebsiteUploadedModal";
import PaymentGatewayModal from "./PaymentGatewayModal";
import Ready2HandoverModal from "./Ready2HandoverModal";
import Stage3CompletionModal from "./Stage3CompletionModal";
import "./Stage3Css.css";
import SocialContentModal from "./SocialContentModal3";
import BackendUserModal from "./BackendUserModal";
import { toast } from "react-toastify";

const apiUrl = process.env.REACT_APP_BACKEND_URL;
const { Option } = Select;

const Stage3website = () => {
  const [data, setData] = useState([]);
  const [isIdPassModalVisible, setIsIdPassModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [currentRecord, setCurrentRecord] = useState(null);

  const [visibleModal, setVisibleModal] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [backendUsers, setBackendUsers] = useState([]); // State to store backend users
  const [remarks, setRemarks] = useState([]);
  const [newRemark, setNewRemark] = useState("");
  const [isRemarksModalVisible, setIsRemarksModalVisible] = useState(false);

  const openModal = (modalType, record) => {
    setSelectedRecord(record);
    setVisibleModal(modalType);
  };

  const closeModal = () => setVisibleModal(null);

  useEffect(() => {
    fetchData();
    fetchBackendUsers(); // Fetch the backend users when the component mounts
  }, []);

  const fetchData = async () => {
    try {
      const managerId = localStorage.getItem("managerId");
      if (!managerId) {
        throw new Error("Manager ID not found in local storage");
      }

      const response = await axios.get(
        `${apiUrl}/api/contact/getall?managerId=${managerId}`
      );
      if (response.status !== 200) {
        throw new Error(`Failed to fetch data: Status code ${response.status}`);
      }

      // Process data
      const processedData = response.data.map((item) => ({
        ...item,
        simpleStatus: {
          stage3Payment:
            item.payment?.stage3?.status === "Done" ? "Done" : "Not Done",
          serverPurchase: item.serverPurchase?.startsWith("Done")
            ? "Done"
            : "Not Done",
          domainClaim: item.domainClaim ? "Done" : "Not Done",
          domainMailVerification: item.domainMailVerification?.startsWith(
            "Done"
          )
            ? "Done"
            : "Not Done",
          websiteUploaded: item.websiteUploaded?.startsWith("Done")
            ? "Done"
            : "Not Done",
          readyToHandover: item.readyToHandover?.startsWith("Done")
            ? "Done"
            : "Not Done",
          stage3Completion: item.stage3Completion?.startsWith("Done")
            ? "Done"
            : "Not Done",
          socialMediaContent:
            item.socialMedia2 === "Completed" ? "Done" : "Not Done",
          paymentGateway: item.paymentGateway ? "Done" : "Not Done",
        },
      }));

      // Filter and sort data by enrollmentId in descending order
      const filteredData = processedData
        .filter(
          (item) =>
            item.stage2Completion?.startsWith("Done") &&
            !item.archive?.startsWith("true")
        )
        .sort((a, b) => b.enrollmentId.localeCompare(a.enrollmentId));

      // Set filtered data to state
      setData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to fetch data");
    }
  };

  const fetchBackendUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/backend`); // Replace with your API endpoint
      setBackendUsers(response.data); // Store the backend users in state
    } catch (error) {
      console.error("Error fetching backend users:", error);
      message.error("Failed to load backend users.");
    }
  };
  const handleOpenIdPassModal = (record) => {
    setCurrentRecord(record);
    form.setFieldsValue({
      id: record.idAndPassWebsite?.id || "",
      pass: record.idAndPassWebsite?.pass || "",
    });
    setIsIdPassModalVisible(true);
  };

  const handleIdPassModalOk = async (values) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${currentRecord._id}`, {
        idAndPassWebsite: {
          id: values.id,
          pass: values.pass,
        },
      });
      message.success("ID and Password updated successfully");
      setIsIdPassModalVisible(false);
      fetchData();
    } catch (error) {
      message.error("Failed to update ID and Password");
    }
  };

  const handleIdPassModalCancel = () => {
    setIsIdPassModalVisible(false);
    setCurrentRecord(null);
  };

  const handleBackendUserChange = async (id, selectedUser) => {
    console.log(`Attempting to update backend user for ID: ${id}`);
    console.log(`Selected backend user: ${selectedUser}`);

    try {
      // Send the updated backend user to the server for that specific record
      const response = await axios.put(
        `${apiUrl}/api/contact/update-backend-user/${id}`,
        {
          backendUser: selectedUser, // Send the selected backend user in the request body
        }
      );

      console.log(`Response from server:`, response); // Log the entire response object

      if (response.status === 200) {
        message.success("Backend user updated successfully!");
        console.log("Backend user updated successfully!");

        // Optionally, refresh the data or update local state if necessary
        // fetchData(); // You can call fetchData() to refresh the data after update
      } else {
        throw new Error(`Failed to update: Status code ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating backend user:", error);
      if (error.response) {
        // Log specific error response data if available
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      }
      message.error("Failed to update backend user.");
    }
  };

  const handleOpenRemarksModal = (record) => {
    setCurrentRecord(record);
    setRemarks(record.remarks || []);
    setIsRemarksModalVisible(true);
  };

  const handleCancel = () => {
    setIsRemarksModalVisible(false);
    setCurrentRecord(null);
    setNewRemark("");
  };

  const handleAddRemark = async () => {
    if (!newRemark) {
      toast.error("Remark cannot be empty");
      return;
    }
    try {
      const updatedRemarks = [
        ...remarks,
        { text: newRemark, date: new Date() },
      ];
      await axios.put(`${apiUrl}/api/contact/remark/${currentRecord._id}`, {
        remarks: updatedRemarks,
      });
      toast.success("Remark added successfully");
      setRemarks(updatedRemarks);
      setNewRemark("");
      fetchData();
    } catch (error) {
      toast.error("Failed to add remark");
    }
  };

  const handleDeleteRemark = async (remark) => {
    const updatedRemarks = remarks.filter((r) => r._id !== remark._id);
    try {
      await axios.put(`${apiUrl}/api/contact/remark/${currentRecord._id}`, {
        remarks: updatedRemarks,
      });
      toast.success("Remark deleted successfully");
      setRemarks(updatedRemarks);
      fetchData();
    } catch (error) {
      toast.error("Failed to delete remark");
    }
  };

  const serverColumns = [
    {
      title: "Enrollment ID",
      dataIndex: "enrollmentId",
      key: "enrollmentId",
      fixed: "left",
      width: 100,
    },
    {
      title: "Stage 3 Payment",
      dataIndex: ["simpleStatus", "stage3Payment"],
      filters: [
        { text: "Done", value: "Done" },
        { text: "Not Done", value: "Not Done" },
      ],
      onFilter: (value, record) => record.simpleStatus.stage3Payment === value,
      render: (text, record) => (
        <Button
          style={{
            backgroundColor:
              record?.payment?.stage3?.status === "Done"
                ? "#90EE90"
                : undefined,
          }}
          onClick={() => openModal("payment", record)}
        >
          Edit Payment
        </Button>
      ),
    },
    {
      title: "Server Purchase",
      dataIndex: ["simpleStatus", "serverPurchase"],
      filters: [
        { text: "Done", value: "Done" },
        { text: "Not Done", value: "Not Done" },
      ],
      onFilter: (value, record) => record.simpleStatus.serverPurchase === value,
      render: (text, record) => (
        <Button
          style={{
            backgroundColor:
              record.simpleStatus.serverPurchase === "Done"
                ? "#90EE90"
                : undefined,
          }}
          onClick={() => openModal("server", record)}
        >
          Server Purchase
        </Button>
      ),
    },
    {
      title: "Domain Claim",
      dataIndex: ["simpleStatus", "domainClaim"],
      filters: [
        { text: "Done", value: "Done" },
        { text: "Not Done", value: "Not Done" },
      ],
      onFilter: (value, record) => record.simpleStatus.domainClaim === value,
      render: (text, record) => (
        <Button
          style={{
            backgroundColor:
              record.simpleStatus.domainClaim === "Done"
                ? "#90EE90"
                : undefined,
          }}
          onClick={() => openModal("domainclaim", record)}
        >
          Domain Claim
        </Button>
      ),
    },
    {
      title: "Domain Mail Verification",
      dataIndex: ["simpleStatus", "domainMailVerification"],
      filters: [
        { text: "Done", value: "Done" },
        { text: "Not Done", value: "Not Done" },
      ],
      onFilter: (value, record) =>
        record.simpleStatus.domainMailVerification === value,
      render: (text, record) => (
        <Button
          style={{
            backgroundColor:
              record.simpleStatus.domainMailVerification === "Done"
                ? "#90EE90"
                : undefined,
          }}
          onClick={() => openModal("domainmail", record)}
        >
          Domain Mail Verification
        </Button>
      ),
    },
    {
      title: "Website Uploaded",
      dataIndex: ["simpleStatus", "websiteUploaded"],
      filters: [
        { text: "Done", value: "Done" },
        { text: "Not Done", value: "Not Done" },
      ],
      onFilter: (value, record) =>
        record.simpleStatus.websiteUploaded === value,
      render: (text, record) => (
        <Button
          style={{
            backgroundColor:
              record.simpleStatus.websiteUploaded === "Done"
                ? "#90EE90"
                : undefined,
          }}
          onClick={() => openModal("websiteuploaded", record)}
        >
          Website Uploaded
        </Button>
      ),
    },
    {
      title: "ID & Pass",
      dataIndex: "idAndPassWebsite",
      key: "idAndPassWebsite",
      width: 100,
      render: (text, record) => (
        <div>
          {record.idAndPassWebsite?.id ? (
            <div
              onClick={() => handleOpenIdPassModal(record)}
              style={{ cursor: "pointer", color: "#1890ff" }}
            >
              <p>
                <strong>ID:</strong> {record.idAndPassWebsite.id}
              </p>
              <p>
                <strong>Pass:</strong> {record.idAndPassWebsite.pass}
              </p>
            </div>
          ) : (
            <Button onClick={() => handleOpenIdPassModal(record)}>
              Set ID & Pass
            </Button>
          )}
        </div>
      ),
    },
    {
      title: "Social Media Content",
      dataIndex: ["simpleStatus", "socialMediaContent"],
      filters: [
        { text: "Done", value: "Done" },
        { text: "Not Done", value: "Not Done" },
      ],
      onFilter: (value, record) =>
        record.simpleStatus.socialMediaContent === value,
      render: (text, record) => (
        <Button
          style={{
            backgroundColor:
              record.simpleStatus.socialMediaContent === "Done"
                ? "#90EE90"
                : undefined,
          }}
          onClick={() => openModal("socialMediaContent", record)}
        >
          Social Media Content
        </Button>
      ),
    },
    // {
    //   title: "Payment Gateway",
    //   dataIndex: ['simpleStatus', 'paymentGateway'],
    //   filters: [
    //     { text: 'Done', value: 'Done' },
    //     { text: 'Not Done', value: 'Not Done' }
    //   ],
    //   onFilter: (value, record) => record.simpleStatus.paymentGateway === value,
    //   render: (text, record) => (
    //     <Button
    //       style={{ backgroundColor: record.simpleStatus.paymentGateway === 'Done' ? '#90EE90' : undefined }}
    //       onClick={() => openModal('paymentgateway', record)}
    //     >
    //       Payment Gateway
    //     </Button>
    //   ),
    // },
    {
      title: "Ready To Handover",
      dataIndex: ["simpleStatus", "readyToHandover"],
      filters: [
        { text: "Done", value: "Done" },
        { text: "Not Done", value: "Not Done" },
      ],
      onFilter: (value, record) =>
        record.simpleStatus.readyToHandover === value,
      render: (text, record) => (
        <Button
          style={{
            backgroundColor:
              record.simpleStatus.readyToHandover === "Done"
                ? "#90EE90"
                : undefined,
          }}
          onClick={() => openModal("ready2handover", record)}
        >
          Ready To Handover
        </Button>
      ),
    },
    {
      title: "Stage 3 Completion",
      dataIndex: ["simpleStatus", "stage3Completion"],
      filters: [
        { text: "Done", value: "Done" },
        { text: "Not Done", value: "Not Done" },
      ],
      onFilter: (value, record) =>
        record.simpleStatus.stage3Completion === value,
      render: (text, record) => (
        <Button
          style={{
            backgroundColor:
              record.simpleStatus.stage3Completion === "Done"
                ? "#90EE90"
                : undefined,
          }}
          onClick={() => openModal("stage3completion", record)}
        >
          Stage 3 Completion
        </Button>
      ),
    },
    // {
    //   title: 'Backend User',
    //   key: 'backendUser',
    //   render: (text, record) => (
    //     <Select
    //       defaultValue={record.backendUser || 'Select Backend User'} // You can set the default value based on the record
    //       style={{ width: 180 }}
    //       onChange={(selectedValue) => handleBackendUserChange(record._id, selectedValue)} // Call a function to handle the change
    //     >
    //       {backendUsers.map(user => (
    //         <Option key={user._id} value={user.name}>{user.name}</Option> // Adjust based on the structure of your API response
    //       ))}
    //     </Select>
    //   ),
    // },
    //     {
    //   title: 'Backend User',
    //   key: 'backendUser',
    //   render: (text, record) => (
    //     <Select
    //       defaultValue={record.backendUser || 'Select Backend User'}
    //       style={{ width: 180 }}
    //       onChange={(selectedValue) => handleBackendUserChange(record._id, selectedValue)} // Trigger backend user selection
    //     >
    //       {backendUsers.map(user => (
    //         <Option key={user._id} value={user.name}>{user.name}</Option>
    //       ))}
    //     </Select>
    //   ),
    // }

    // {
    //   title: "Backend User",
    //   render: (text, record) => (
    //     <Button
    //       onClick={() => openModal('backendUser', record)}
    //     >
    //       Show
    //     </Button>
    //   ),
    // },
    // {
    //   title: "Backend User",
    //   width: 70,
    //   render: (text, record) => (
    //     <Button
    //       style={{
    //         backgroundColor: record?.backendUser ? '#90EE90' : undefined, // Green if backendUser has a value
    //         color: '#000', // Ensure text is readable if background is green
    //       }}
    //       onClick={() => openModal('backendUser', record)}
    //     >
    //       Show
    //     </Button>
    //   ),
    // },
    {
      title: "Remarks",
      key: "remarks",
      render: (text, record) => (
        <Badge
          count={record.remarks.length}
          offset={[-6, 5]} /* Adjust offset as needed */
        >
          <Button onClick={() => handleOpenRemarksModal(record)}>
            Remarks
          </Button>
        </Badge>
      ),
    },
  ];

  const getRowClassName = (record) => {
    const paymentDate = record?.payment?.stage3?.date
      ? moment(record.payment.stage3.date)
      : null;
    const isOverdue = paymentDate && moment().diff(paymentDate, "days") > 7;
    const stage3NotDone =
      !record?.stage3Completion || record.stage3Completion !== "Done";

    if (record?.backendUser) {
      return "row-blue"; // This class will apply the blue background
    }

    if (isOverdue && stage3NotDone) {
      return "row-red"; // This class will apply the red background
    }
    return "";
  };

  return (
    <>
      <div style={{ maxHeight: "1000px", overflowY: "auto" }}>
        <Table
          columns={serverColumns}
          dataSource={data}
          rowKey="_id"
          rowClassName={getRowClassName}
          scroll={{ x: "max-content", y: 601 }}
          sticky
        />
      </div>

      {/* Modals go here */}
      {/* payment modal */}

      {visibleModal === "payment" && (
        <PaymentModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

      {/* server purchase modal */}
      {visibleModal === "socialMediaContent" && (
        <SocialContentModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

      {visibleModal === "server" && (
        <ServerPurchaseModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

      {/* domain claim modal */}

      {visibleModal === "domainclaim" && (
        <DomainClaimModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

      {/* domain mail verification */}

      {visibleModal === "domainmail" && (
        <DomainMailVerificationModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

      {/* website uploaded modal */}

      {visibleModal === "websiteuploaded" && (
        <WebsiteUploadedModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

      {/* payment gateway modal */}

      {visibleModal === "paymentgateway" && (
        <PaymentGatewayModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

      {/* ready to handover modal */}

      {visibleModal === "ready2handover" && (
        <Ready2HandoverModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

      {/* stage 3 completion modal */}

      {visibleModal === "stage3completion" && (
        <Stage3CompletionModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}
      {/* backend user modal */}

      {visibleModal === "backendUser" && (
        <BackendUserModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}
      {/* Remarks Modal */}
      <Modal
        title="Remarks"
        open={isRemarksModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <List
          dataSource={remarks}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button onClick={() => handleDeleteRemark(item)}>
                  Delete
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={moment(item.date).format("DD-MM-YYYY")}
                description={item.text}
              />
            </List.Item>
          )}
        />
        <Input.TextArea
          rows={4}
          value={newRemark}
          onChange={(e) => setNewRemark(e.target.value)}
        />
        <Button type="primary" onClick={handleAddRemark}>
          Add Remark
        </Button>
      </Modal>

      {/* ID and Password Modal */}
      <Modal
        title="Set ID & Pass"
        open={isIdPassModalVisible}
        onOk={() => form.submit()}
        onCancel={handleIdPassModalCancel}
      >
        <Form form={form} onFinish={handleIdPassModalOk}>
          <Form.Item label="ID" name="id">
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="pass">
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Stage3website;
