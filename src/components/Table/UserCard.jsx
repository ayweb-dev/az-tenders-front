import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

const UserCard = ({ item }) => {
  return (
    <div className='flex flex-wrap justify-center gap-4 p-4'>
      {item.map((Val) => (
        <Col key={Val.id} className='flex flex-wrap justify-center gap-4 p-4 w-[300px] h-[400px] '>
          <Card className='bg-blue-100 border border-gray-200 rounded-lg shadow-lg overflow-hidden w-full h-full dark:text-darkColor'>
            <Card.Body className='p-4 justify-bottom'>
              <Card.Title className='text-xl font-bold mb-2'>{Val.title}</Card.Title>
              <Card.Text >
                <strong>Year:</strong> {Val.year}
                <br />
                <strong>Runtime:</strong> {Val.runtime} mins
                <br />
                <strong>Director:</strong> {Val.director}
                <br />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </div>
  );
};

export default UserCard;
