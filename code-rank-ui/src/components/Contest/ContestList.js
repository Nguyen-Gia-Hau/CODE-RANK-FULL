
import React, { useState, useEffect } from 'react';
import { Button, Modal, List, message, Table, Row, Col, Form, Input, DatePicker, InputNumber } from 'antd';
import { BACKEND_URL } from '../../context/ServerStore';
import './contest.css';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ContestList = () => {
  const [contests, setContests] = useState([]);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [isRankingModalVisible, setIsRankingModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false); // Modal for creating contest
  const [selectedContestId, setSelectedContestId] = useState(null);
  const [rankings, setRankings] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state for creating contest
  const [form] = Form.useForm(); // Form instance
  const { auth } = useAuth();
  const accessToken = auth.accessToken;
  const usernameFromLocalStorage = localStorage.getItem('username');
  const role = localStorage.getItem('role'); // Get the role from localStorage
  const [formValues, setFormValues] = useState({
    title: '',
    start_time: '',
    total_time: ''
  });
  useEffect(() => {
    fetch(`${BACKEND_URL}/contests`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setContests(data);
      })
      .catch(error => {
        console.error('Error fetching contests:', error);
      });
  }, []);

  const showRegisterModal = (contestId) => {
    setSelectedContestId(contestId);
    setIsRegisterModalVisible(true);
  };

  const showRankingModal = (contestId) => {
    setSelectedContestId(contestId);
    fetch(`${BACKEND_URL}/contests/ranks/${contestId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setRankings(data);
        setIsRankingModalVisible(true);
      })
      .catch(error => {
        console.error('Error fetching rankings:', error);
        setRankings([]);
      });
  };

  const handleRegister = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/contests/users/${selectedContestId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      const data = await response.json();
      message.success(data.message);
      setIsRegisterModalVisible(false);
    } catch (error) {
      console.error('Error registering for contest:', error);
      message.error(error.message || 'Registration failed.');
    }
  };

  const handleCancel = () => {
    setIsRegisterModalVisible(false);
    setIsRankingModalVisible(false);
    setIsCreateModalVisible(false); // Hide create contest modal
  };


  const handleCreateContest = async (event) => {
    event.preventDefault(); // Ngăn chặn làm mới trang
    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/contests`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formValues.title,
          start_time: moment(formValues.start_time).format('YYYY-MM-DD HH:mm:ss'), // Format start time
          total_time: formValues.total_time, // Total time in minutes
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create contest');
      }

      const data = await response.json();
      message.success('Contest created successfully!');
      setContests([...contests, data]); // Cập nhật danh sách contest
      form.resetFields(); // Reset form
      setIsCreateModalVisible(false); // Đóng modal
    } catch (error) {
      console.error('Error creating contest:', error);
      message.error('Failed to create contest.');
    } finally {
      setIsLoading(false);
    }
  };


  // Table columns to display rankings
  const columns = [
    {
      title: 'Order',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (username) => <Link to={`/profile/${username}`}>{username}</Link>
    },
    {
      title: 'Problems Solved',
      dataIndex: 'problems',
      key: 'problems',
      render: (problems) => (
        <Row gutter={[16, 16]}>
          {problems.map((problem, index) => (
            <Col key={index} span={8}>
              <div className={problem.status ? 'status-solved' : 'status-unsolved'}>
                <Link to={`/problems/${problem.problemID}`}>{problem.problemID}</Link>
              </div>
            </Col>
          ))}
        </Row>
      ),
    },
    {
      title: 'Points',
      dataIndex: 'points',
      key: 'points',
    },
  ];
  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const now = moment();

  const upcomingContests = contests.filter(contest => moment(contest.start_time).isAfter(now));
  const ongoingContests = contests.filter(contest =>
    moment(contest.start_time).isBefore(now) &&
    moment(contest.start_time).add(contest.total_time, 'minutes').isAfter(now)
  );
  const pastContests = contests.filter(contest =>
    moment(contest.start_time).add(contest.total_time, 'minutes').isBefore(now)
  );
  return (
    <div className='contest-list-container'>

      {/* Conditionally show "Add Contest" button if the user is an admin */}
      {role === 'admin' && (
        <Button type="primary" onClick={() => setIsCreateModalVisible(true)}>
          Add Contest
        </Button>
      )}



      {/* Ongoing Contests */}
      <div className='contest-section'>
        <h3>Ongoing Contests</h3>
        <List
          itemLayout="horizontal"
          dataSource={ongoingContests}
          renderItem={contest => (
            <List.Item className="ongoing-contest">
              <div className="contest-list-item">
                <div>
                  <Link to={`/contests/${contest.contest_id}`} className="contest-title">{contest.title}</Link>
                  <div className="contest-description">
                    Ends at: {moment(contest.start_time).add(contest.total_time, 'minutes').format('YYYY-MM-DD HH:mm:ss')} - Participants: {contest.participant_count}
                  </div>
                </div>
                <div className='btns'>
                  <div className="contest-actions">
                    <Button type="default" onClick={() => showRankingModal(contest.contest_id)}>Rankings</Button>
                  </div>
                  <div className="contest-actions">
                    <Button type="primary" onClick={() => showRegisterModal(contest.contest_id)}>Register</Button>
                  </div>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>

      {/* Upcoming Contests */}
      <div className='contest-section'>
        <h3>Upcoming Contests</h3>
        <List
          itemLayout="horizontal"
          dataSource={upcomingContests}
          renderItem={contest => (
            <List.Item className="upcoming-contest">
              <div className="contest-list-item">
                <div>
                  <Link to={`/contests/${contest.contest_id}`} className="contest-title">{contest.title}</Link>
                  <div className="contest-description">
                    Start Time: {new Date(contest.start_time).toLocaleString('vi-VN')} - Participants: {contest.participant_count}
                  </div>
                </div>
                <div className="contest-actions">
                  <Button type="primary" onClick={() => showRegisterModal(contest.contest_id)}>Register</Button>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>

      {/* Past Contests */}
      <div className='contest-section'>
        <h3>Past Contests</h3>
        <List
          itemLayout="horizontal"
          dataSource={pastContests}
          renderItem={contest => (
            <List.Item className="past-contest">
              <div className="contest-list-item">
                <div>
                  <Link to={`/contests/${contest.contest_id}`} className="contest-title">{contest.title}</Link>
                  <div className="contest-description">
                    Ended at: {moment(contest.start_time).add(contest.total_time, 'minutes').format('YYYY-MM-DD HH:mm:ss')} - Participants: {contest.participant_count}
                  </div>
                </div>
                <div className="contest-actions">
                  <Button type="default" onClick={() => showRankingModal(contest.contest_id)}>Rankings</Button>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
      {/* Register Modal */}
      <Modal
        title="Register for Contest"
        visible={isRegisterModalVisible}
        onOk={handleRegister}
        onCancel={handleCancel}
        okText="Register"
        cancelText="Cancel"
      >
        <p>Are you sure you want to register for contest {selectedContestId}?</p>
      </Modal>

      {/* Ranking Modal */}
      <Modal
        title={`Rankings for Contest ${selectedContestId}`}
        visible={isRankingModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={1200}  // Adjust modal width for the table
      >
        <Table
          columns={columns}
          dataSource={rankings}
          rowKey="username"
          pagination={false}  // Disable pagination to show all results
          rowClassName={(record) => record.username === usernameFromLocalStorage ? 'highlight-row' : ''} // Add highlight class
        />
      </Modal>


      {/* Create Contest Modal */}
      {
        isCreateModalVisible && (
          <div className='modal'>
            <div className='modal-content'>
              <h2>Create New Contest</h2>
              <form onSubmit={handleCreateContest}>
                <div className="form-group">
                  <label>Title:</label>
                  <input
                    type="text"
                    name="title"
                    value={formValues.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Start Time:</label>
                  <input
                    type="datetime-local"
                    name="start_time"
                    value={formValues.start_time}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Duration (in minutes):</label>
                  <input
                    type="number"
                    name="total_time"
                    value={formValues.total_time}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </div>

                <div className="form-group">
                  <div className='btns'>
                    <button type="submit" disabled={isLoading}>
                      {isLoading ? 'Creating...' : 'Create Contest'}
                    </button>
                    <button type="button" onClick={() => setIsCreateModalVisible(false)}>
                      Cancel
                    </button>

                  </div>
                </div>
              </form>
            </div>
          </div>
        )
      }

    </div >
  );
}

export default ContestList;
