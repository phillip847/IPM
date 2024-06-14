import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Bar, Pie } from 'react-chartjs-2';
import { UserContext } from '../../context/user.context';
import DashboardNavbar from '../NavBar/DashboardNav';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LandingPage.css';
import '../NavBar/DashboardNav.css';

function LandingPage() {
  const { user, logOutUser } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [statistics, setStatistics] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newUsersToday: 0,
    revenue: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const mongodb = user.mongoClient('mongodb-atlas');
          const collection = mongodb.db('public-management-system').collection('users');
          
          const result = await collection.find();
          setData(result);

          // Calculate statistics
          const totalUsers = result.length;
          const activeUsers = result.filter(user => user.employmentStatus === 'active').length;
          const newUsersToday = result.filter(user => new Date(user.createdAt).toDateString() === new Date().toDateString()).length;
          const revenue = totalUsers * 100; // Example calculation

          setStatistics({ totalUsers, activeUsers, newUsersToday, revenue });
        } catch (error) {
          console.error('Failed to fetch data:', error);
        }
      }
    };

    fetchData();
  }, [user]);

  const logOut = async () => {
    try {
      const loggedOut = await logOutUser();
      if (loggedOut) {
        window.location.reload(true);
      }
    } catch (error) {
      alert(error);
    }
  };

  const barChartData = {
    labels: data.map(user => user.email),
    datasets: [
      {
        label: 'ID Numbers',
        data: data.map(user => user.idNumber),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const pieChartData = {
    labels: ['Active Users', 'Inactive Users'],
    datasets: [
      {
        data: [statistics.activeUsers, statistics.totalUsers - statistics.activeUsers],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384']
      }
    ]
  };

  return (
    <Container fluid>
      <Row>
        {/* Navigation */}
        <Col sm={2} className="bg-dark text-light">
          <DashboardNavbar />
        </Col>

        {/* Main Content */}
        <Col sm={10} className="bg-light">
          <h3 className="mt-4 mb-4">Dashboard</h3>
          
          <Row className="mb-4">
            <Col sm={3}>
              <Card>
                <Card.Body>
                  <Card.Title>Total Users</Card.Title>
                  <Card.Text>{statistics.totalUsers}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={3}>
              <Card>
                <Card.Body>
                  <Card.Title>Active Users</Card.Title>
                  <Card.Text>{statistics.activeUsers}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={3}>
              <Card>
                <Card.Body>
                  <Card.Title>New Users Today</Card.Title>
                  <Card.Text>{statistics.newUsersToday}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={3}>
              <Card>
                <Card.Body>
                  <Card.Title>Revenue</Card.Title>
                  <Card.Text>${statistics.revenue}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col sm={6}>
              <h4 className="mt-4 mb-4">User ID Numbers</h4>
              <Bar data={barChartData} />
            </Col>
            <Col sm={6}>
              <h4 className="mt-4 mb-4">User Status</h4>
              <Pie data={pieChartData} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default LandingPage;
