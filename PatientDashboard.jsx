import React, { useState } from 'react';
import { User, FileText, Calendar, MessageCircle, LogOut, Home, Upload, Clock, Users, ChevronRight, Activity, X, Camera, CheckCircle, Layers } from 'lucide-react';
import './Dashboard.css';

const PatientDashboard = ({ username, onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  // Mock data for recent uploads
  const recentUploads = [
    { id: 1, name: 'CT Scan - Chest', date: 'May 2, 2025', status: 'Analyzed' },
    { id: 2, name: 'CT Scan - Lungs', date: 'April 15, 2025', status: 'Pending Review' }
  ];
  
  // Mock data for doctors
  const availableDoctors = [
    { id: 1, name: 'Dr. Sarah Miller', specialty: 'Pulmonology', availability: 'Available May 15-20', image: '/api/placeholder/60/60' },
    { id: 2, name: 'Dr. James Rodriguez', specialty: 'Oncology', availability: 'Available May 12-18', image: '/api/placeholder/60/60' },
    { id: 3, name: 'Dr. Emily Chen', specialty: 'Radiology', availability: 'Available May 10-16', image: '/api/placeholder/60/60' }
  ];
  
  // Mock data for appointments
  const appointments = [
    { id: 1, doctor: 'Dr. Sarah Miller', type: 'Pulmonology Consultation', date: 'May 15, 2025', time: '10:30 AM - 11:30 AM' },
    { id: 2, doctor: 'Dr. James Rodriguez', type: 'Follow-up CT Scan', date: 'June 2, 2025', time: '9:00 AM - 10:00 AM' }
  ];
  
  // Mock patient data
  const patientInfo = {
    name: 'Robert Johnson',
    id: 'PAT-2023-8642',
    age: '54 years',
    scanDate: 'May 3, 2025',
    clinicalNotes: 'Patient presents with persistent cough for 3 months. Former smoker (2 packs/day for 20 years, quit 5 years ago). Family history of lung cancer.'
  };
  
  const handleUpload = (e) => {
    e.preventDefault();
    // Simulate upload process
    setTimeout(() => {
      setUploadSuccess(true);
      setTimeout(() => {
        setUploadSuccess(false);
        setShowUploadModal(false);
      }, 2000);
    }, 1500);
  };
  
  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2 className="dashboard-logo">LungEvity</h2>
        </div>
        <div className="sidebar-menu">
          <button 
            className={`sidebar-item ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
            type="button"
          >
            <Home className="sidebar-icon" />
            <span>Home</span>
          </button>
          <button 
            className={`sidebar-item ${activeTab === 'appointments' ? 'active' : ''}`}
            onClick={() => setActiveTab('appointments')}
            type="button"
          >
            <Calendar className="sidebar-icon" />
            <span>Book Doctor</span>
          </button>
          <button 
            className={`sidebar-item ${activeTab === 'scans' ? 'active' : ''}`}
            onClick={() => setActiveTab('scans')}
            type="button"
          >
            <Upload className="sidebar-icon" />
            <span>CT Scans</span>
          </button>
          <button 
            className={`sidebar-item ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
            type="button"
          >
            <Clock className="sidebar-icon" />
            <span>Recent Uploads</span>
          </button>
          <button 
            className={`sidebar-item ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
            type="button"
          >
            <MessageCircle className="sidebar-icon" />
            <span>Contact Doctor</span>
          </button>
        </div>
        <div className="sidebar-footer">
          <button className="logout-button" onClick={onLogout} type="button">
            <LogOut className="sidebar-icon" />
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      <div className="dashboard-content">
        <div className="dashboard-topbar">
          <h2>Patient Platform</h2>
          <div className="user-info">
            <div className="user-avatar">
              <User className="avatar-icon" />
            </div>
            <span className="username">Welcome, {username}</span>
          </div>
        </div>
        
        <div className="dashboard-main">
          {activeTab === 'home' && (
            <>
              <div className="welcome-card">
                <h1>Welcome to Your Patient Platform</h1>
                <p>Your health information and resources are available here. View your test results, upcoming appointments, and health recommendations all in one place.</p>
              </div>
              
              <div className="dashboard-grid">
                <div className="dashboard-card">
                  <h3>Your Upcoming Appointments</h3>
                  <div className="card-content">
                    {appointments.length > 0 ? (
                      appointments.map(appointment => (
                        <div className="appointment-item" key={appointment.id}>
                          <div className="appointment-date">
                            <span className="month">{appointment.date.split(' ')[0]}</span>
                            <span className="day">{appointment.date.split(' ')[1].replace(',', '')}</span>
                          </div>
                          <div className="appointment-details">
                            <h4>{appointment.doctor}</h4>
                            <p>{appointment.type}</p>
                            <p>{appointment.time}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="no-data-message">No upcoming appointments scheduled.</p>
                    )}
                    <button 
                      className="action-button" 
                      onClick={() => setActiveTab('appointments')}
                      type="button"
                    >
                      Schedule Appointment
                    </button>
                  </div>
                </div>
                
                <div className="dashboard-card">
                  <h3>Recent Uploads</h3>
                  <div className="card-content">
                    {recentUploads.length > 0 ? (
                      recentUploads.map(upload => (
                        <div className="upload-item" key={upload.id}>
                          <div className="upload-icon">
                            <FileText />
                          </div>
                          <div className="upload-details">
                            <h4>{upload.name}</h4>
                            <p>Date: {upload.date}</p>
                            <p className={`status ${upload.status === 'Analyzed' ? 'success' : 'pending'}`}>
                              {upload.status}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="no-data-message">No recent uploads.</p>
                    )}
                    <button 
                      className="action-button"
                      onClick={() => setShowUploadModal(true)}
                      type="button"
                    >
                      Upload New Scan
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="dashboard-card full-width">
                <h3>Health Summary</h3>
                <div className="health-summary">
                  <div className="health-metrics">
                    <div className="metric-item">
                      <h4>Latest Scan Result</h4>
                      <div className="metric-value success">No abnormalities detected</div>
                      <p className="metric-date">May 2, 2025</p>
                    </div>
                    <div className="metric-item">
                      <h4>Next Check-up</h4>
                      <div className="metric-value">June 2, 2025</div>
                      <p className="metric-date">With Dr. James Rodriguez</p>
                    </div>
                    <div className="metric-item">
                      <h4>Medication Status</h4>
                      <div className="metric-value">Up to date</div>
                      <p className="metric-date">Last updated: April 28, 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {activeTab === 'appointments' && (
            <>
              <div className="page-header">
                <h1>Book a Doctor</h1>
                <p>Schedule an appointment with one of our specialists.</p>
              </div>
              
              <div className="doctors-grid">
                {availableDoctors.map(doctor => (
                  <div className="doctor-card" key={doctor.id}>
                    <div className="doctor-avatar">
                      <img src={doctor.image} alt={doctor.name} />
                    </div>
                    <div className="doctor-info">
                      <h3>{doctor.name}</h3>
                      <p className="doctor-specialty">{doctor.specialty}</p>
                      <p className="doctor-availability">{doctor.availability}</p>
                      <button className="book-button" type="button">Book Appointment</button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="dashboard-card full-width">
                <h3>Your Scheduled Appointments</h3>
                <div className="appointments-list">
                  {appointments.length > 0 ? (
                    appointments.map(appointment => (
                      <div className="appointment-list-item" key={appointment.id}>
                        <div className="appointment-list-date">
                          <span className="month">{appointment.date.split(' ')[0]}</span>
                          <span className="day">{appointment.date.split(' ')[1].replace(',', '')}</span>
                        </div>
                        <div className="appointment-list-details">
                          <h4>{appointment.doctor}</h4>
                          <p>{appointment.type}</p>
                          <p>{appointment.time}</p>
                        </div>
                        <div className="appointment-list-actions">
                          <button className="reschedule-button" type="button">Reschedule</button>
                          <button className="cancel-button" type="button">Cancel</button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-data-message">No appointments scheduled.</p>
                  )}
                </div>
              </div>
            </>
          )}
          
          {activeTab === 'scans' && (
            <>
              <div className="page-header">
                <h1>CT Scan Analysis</h1>
                <p>View and analyze your CT scan results with our AI-powered platform.</p>
              </div>
              
              <div className="main-header">
                <h3 className="main-title">CT Scan Results</h3>
                <button type="button" className="upload-button" onClick={() => setShowUploadModal(true)}>
                  <Upload className="icon-sm" /> Upload New Scan
                </button>
              </div>
              
              <div className="scan-grid">
                {/* Scan Viewer */}
                <div className="scan-viewer">
                  <img 
                    src="/api/placeholder/400/400" 
                    alt="CT Scan" 
                    className="scan-image" 
                  />
                </div>
                
                {/* Analysis Results */}
                <div className="analysis-container">
                  <h4 className="analysis-title">AI Analysis Results</h4>
                  
                  <div className="analysis-content">
                    <div className="analysis-section">
                      <div className="probability-header">
                        <span className="probability-label">Cancer Probability</span>
                        <span className="probability-value">68%</span>
                      </div>
                      <div className="progress-container">
                        <div className="progress-bar" style={{width: '68%'}}></div>
                      </div>
                    </div>
                    
                    <div className="section-divider">
                      <h5 className="section-subtitle">Detected Abnormalities</h5>
                      <ul className="abnormality-list">
                        <li className="abnormality-item">
                          <ChevronRight className="abnormality-icon icon-sm" />
                          <div className="abnormality-content">
                            <p className="abnormality-title">Nodule detected in right upper lobe</p>
                            <p className="abnormality-details">Size: 1.8cm x 1.4cm, Irregular borders</p>
                          </div>
                        </li>
                        <li className="abnormality-item">
                          <ChevronRight className="abnormality-icon warning icon-sm" />
                          <div className="abnormality-content">
                            <p className="abnormality-title">Ground-glass opacity</p>
                            <p className="abnormality-details">Left lower lobe, 4.2mm diameter</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="section-divider">
                      <h5 className="section-subtitle">Recommended Actions</h5>
                      <ul className="action-list">
                        <li className="action-item">
                          <Activity className="action-icon icon-sm" />
                          Schedule follow-up scan in 30 days
                        </li>
                        <li className="action-item">
                          <Activity className="action-icon icon-sm" />
                          Consider biopsy of right upper lobe nodule
                        </li>
                        <li className="action-item">
                          <Activity className="action-icon icon-sm" />
                          Refer to pulmonary specialist
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="analysis-actions">
                    <button type="button" className="primary-button">
                      View Detailed Report
                    </button>
                    <button type="button" className="secondary-button">
                      Consult Doctor
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="patient-info">
                <h4 className="patient-title">Your Information</h4>
                <div className="patient-card">
                  <div className="patient-grid">
                    <div className="patient-field">
                      <p className="field-label">Patient Name</p>
                      <p className="field-value">{patientInfo.name}</p>
                    </div>
                    <div className="patient-field">
                      <p className="field-label">Patient ID</p>
                      <p className="field-value">{patientInfo.id}</p>
                    </div>
                    <div className="patient-field">
                      <p className="field-label">Age</p>
                      <p className="field-value">{patientInfo.age}</p>
                    </div>
                    <div className="patient-field">
                      <p className="field-label">Scan Date</p>
                      <p className="field-value">{patientInfo.scanDate}</p>
                    </div>
                  </div>
                  
                  <div className="patient-notes">
                    <p className="notes-label">Clinical Notes</p>
                    <p className="notes-text">{patientInfo.clinicalNotes}</p>
                  </div>
                </div>
              </div>
              
              <div className="dashboard-card full-width">
                <h3>Upload Guidelines</h3>
                <div className="guidelines-content">
                  <div className="guideline-item">
                    <h4>File Requirements</h4>
                    <ul className="guideline-list">
                      <li>Files must be in DICOM, NIFTI, JPEG, or PNG format</li>
                      <li>Maximum file size: 100MB per file</li>
                      <li>For optimal analysis, DICOM format is preferred</li>
                    </ul>
                  </div>
                  <div className="guideline-item">
                    <h4>Processing Time</h4>
                    <ul className="guideline-list">
                      <li>Initial AI analysis typically takes 5-10 minutes</li>
                      <li>Specialist review may take up to 24 hours</li>
                      <li>You will receive a notification when results are ready</li>
                    </ul>
                  </div>
                  <div className="guideline-item">
                    <h4>Privacy Information</h4>
                    <ul className="guideline-list">
                      <li>All uploads are encrypted and stored securely</li>
                      <li>Only authorized healthcare providers have access to your scans</li>
                      <li>You can delete your uploaded scans at any time</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {activeTab === 'history' && (
            <>
              <div className="page-header">
                <h1>Recent Uploads</h1>
                <p>View and manage your uploaded CT scans and results.</p>
              </div>
              
              {recentUploads.length > 0 ? (
                <div className="uploads-table-container">
                  <table className="uploads-table">
                    <thead>
                      <tr>
                        <th>Scan Name</th>
                        <th>Upload Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUploads.map(upload => (
                        <tr key={upload.id}>
                          <td>{upload.name}</td>
                          <td>{upload.date}</td>
                          <td>
                            <span className={`status-badge ${upload.status === 'Analyzed' ? 'success' : 'pending'}`}>
                              {upload.status}
                            </span>
                          </td>
                          <td>
                            <div className="table-actions">
                              <button className="table-action-button" type="button">View Results</button>
                              <button className="table-action-button" type="button">Download</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="no-data-container">
                  <FileText className="no-data-icon" />
                  <h3>No Uploads Yet</h3>
                  <p>You haven't uploaded any CT scans yet. Upload a scan to get started.</p>
                  <button 
                    className="action-button"
                    onClick={() => setShowUploadModal(true)}
                    type="button"
                  >
                    Upload CT Scan
                  </button>
                </div>
              )}
            </>
          )}
          
          {activeTab === 'contact' && (
            <>
              <div className="page-header">
                <h1>Contact Your Doctor</h1>
                <p>Reach out to your healthcare providers with any questions or concerns.</p>
              </div>
              
              <div className="contact-grid">
                <div className="contact-card">
                  <div className="contact-header">
                    <h3>Your Care Team</h3>
                  </div>
                  <div className="contact-list">
                    <div className="contact-item">
                      <div className="contact-avatar">
                        <img src="/api/placeholder/60/60" alt="Dr. Sarah Miller" />
                      </div>
                      <div className="contact-details">
                        <h4>Dr. Sarah Miller</h4>
                        <p>Pulmonology</p>
                        <div className="contact-actions">
                          <button className="contact-action-button" type="button">Message</button>
                          <button className="contact-action-button" type="button">Call</button>
                        </div>
                      </div>
                    </div>
                    <div className="contact-item">
                      <div className="contact-avatar">
                        <img src="/api/placeholder/60/60" alt="Dr. James Rodriguez" />
                      </div>
                      <div className="contact-details">
                        <h4>Dr. James Rodriguez</h4>
                        <p>Oncology</p>
                        <div className="contact-actions">
                          <button className="contact-action-button" type="button">Message</button>
                          <button className="contact-action-button" type="button">Call</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="message-card">
                  <div className="message-header">
                    <h3>Send a Message</h3>
                  </div>
                  <div className="message-form">
                    <div className="form-group">
                      <label htmlFor="recipient">Recipient</label>
                      <select id="recipient" name="recipient">
                        <option value="">Select a healthcare provider</option>
                        <option value="1">Dr. Sarah Miller</option>
                        <option value="2">Dr. James Rodriguez</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <input type="text" id="subject" name="subject" placeholder="Enter message subject" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea id="message" name="message" rows="5" placeholder="Type your message here..."></textarea>
                    </div>
                    <div className="form-actions">
                      <button className="cancel-button" type="button">Cancel</button>
                      <button className="send-button" type="button">Send Message</button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="dashboard-card full-width">
                <h3>Message History</h3>
                <div className="message-history">
                  <div className="message-history-item">
                    <div className="message-history-header">
                      <h4>Question about medication</h4>
                      <span className="message-date">April 30, 2025</span>
                    </div>
                    <p className="message-recipient">To: Dr. Sarah Miller</p>
                    <p className="message-preview">I've been experiencing some side effects from the new medication...</p>
                    <div className="message-status">
                      <span className="status-badge success">Replied</span>
                    </div>
                  </div>
                  <div className="message-history-item">
                    <div className="message-history-header">
                      <h4>Follow-up appointment</h4>
                      <span className="message-date">April 22, 2025</span>
                    </div>
                    <p className="message-recipient">To: Dr. James Rodriguez</p>
                    <p className="message-preview">I wanted to confirm my follow-up appointment scheduled for...</p>
                    <div className="message-status">
                      <span className="status-badge success">Replied</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Upload Modal */}
      {showUploadModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Upload CT Scan</h2>
              <button className="close-button" onClick={() => setShowUploadModal(false)} type="button">
                <X className="icon-sm" />
              </button>
            </div>
            
            {uploadSuccess ? (
              <div className="success-message">
                <CheckCircle className="success-icon" />
                <h3>Upload Successful!</h3>
                <p>Your CT scan has been uploaded and is being processed. You will be notified when the analysis is complete.</p>
              </div>
            ) : (
              <form className="upload-form" onSubmit={handleUpload}>
                <div className="upload-drop-area">
                  <Camera className="upload-icon-large" />
                  <h3>Drag & Drop Files Here</h3>
                  <p>or</p>
                  <button type="button" className="browse-button">Browse Files</button>
                  <input type="file" id="file-upload" className="hidden-input" />
                  <p className="upload-formats">Accepted formats: DICOM, NIFTI, JPEG, PNG</p>
                </div>
                
                <div className="form-group">
                  <label htmlFor="scan-name">Scan Name</label>
                  <input type="text" id="scan-name" name="scan-name" placeholder="e.g., Chest CT Scan - May 2025" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="scan-notes">Notes (Optional)</label>
                  <textarea id="scan-notes" name="scan-notes" rows="3" placeholder="Add any notes about this scan..."></textarea>
                </div>
                
                <div className="modal-actions">
                  <button type="button" className="cancel-button" onClick={() => setShowUploadModal(false)}>Cancel</button>
                  <button type="submit" className="upload-button">Upload Scan</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
