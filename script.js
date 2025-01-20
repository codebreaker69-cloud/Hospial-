// Data storage
let patients = [
  { id: 1, name: 'Jane Smith', age: 32, contact: '098-765-4321' },
  { id: 2, name: 'John Doe', age: 45, contact: '123-456-7890' }
];

let doctors = [
  { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Cardiology', contact: '555-123-4567' },
  { id: 2, name: 'Dr. Michael Chen', specialization: 'Pediatrics', contact: '555-987-6543' }
];

let appointments = [
  { id: 1, patientName: 'Jane Smith', doctorName: 'Dr. Sarah Johnson', date: '2024-03-15', time: '09:00' },
  { id: 2, patientName: 'John Doe', doctorName: 'Dr. Michael Chen', date: '2024-03-16', time: '14:30' }
];

// Tab switching
document.querySelectorAll('.nav-btn').forEach(button => {
  button.addEventListener('click', () => {
      // Update active tab button
      document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Show active tab content
      const tabId = button.dataset.tab;
      document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
      document.getElementById(tabId).classList.add('active');

      // Refresh table data
      refreshTables();
  });
});

// Modal handling
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close');

closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = (event) => {
  if (event.target === modal) {
      modal.style.display = 'none';
  }
};

// Table refresh functions
function refreshTables() {
  refreshPatientsTable();
  refreshDoctorsTable();
  refreshAppointmentsTable();
}

function refreshPatientsTable() {
  const tbody = document.getElementById('patients-table-body');
  tbody.innerHTML = patients.map(patient => `
      <tr>
          <td>${patient.id}</td>
          <td>${patient.name}</td>
          <td>${patient.age}</td>
          <td>${patient.contact}</td>
          <td>
              <button class="action-btn edit-btn" onclick="editPatient(${patient.id})">Edit</button>
              <button class="action-btn delete-btn" onclick="deletePatient(${patient.id})">Delete</button>
          </td>
      </tr>
  `).join('');
}

function refreshDoctorsTable() {
  const tbody = document.getElementById('doctors-table-body');
  tbody.innerHTML = doctors.map(doctor => `
      <tr>
          <td>${doctor.id}</td>
          <td>${doctor.name}</td>
          <td>${doctor.specialization}</td>
          <td>${doctor.contact}</td>
          <td>
              <button class="action-btn edit-btn" onclick="editDoctor(${doctor.id})">Edit</button>
              <button class="action-btn delete-btn" onclick="deleteDoctor(${doctor.id})">Delete</button>
          </td>
      </tr>
  `).join('');
}

function refreshAppointmentsTable() {
  const tbody = document.getElementById('appointments-table-body');
  tbody.innerHTML = appointments.map(appointment => `
      <tr>
          <td>${appointment.id}</td>
          <td>${appointment.patientName}</td>
          <td>${appointment.doctorName}</td>
          <td>${appointment.date}</td>
          <td>${appointment.time}</td>
          <td>
              <button class="action-btn edit-btn" onclick="editAppointment(${appointment.id})">Edit</button>
              <button class="action-btn delete-btn" onclick="deleteAppointment(${appointment.id})">Delete</button>
          </td>
      </tr>
  `).join('');
}

// Add functions
function showAddPatientModal() {
  modalBody.innerHTML = `
      <h2>Add Patient</h2>
      <form id="add-patient-form">
          <div class="form-group">
              <label for="name">Name</label>
              <input type="text" id="name" required>
          </div>
          <div class="form-group">
              <label for="age">Age</label>
              <input type="number" id="age" required>
          </div>
          <div class="form-group">
              <label for="contact">Contact</label>
              <input type="text" id="contact" required>
          </div>
          <div class="modal-actions">
              <button type="button" class="cancel-btn" onclick="closeModal()">Cancel</button>
              <button type="submit" class="save-btn">Save</button>
          </div>
      </form>
  `;

  document.getElementById('add-patient-form').onsubmit = (e) => {
      e.preventDefault();
      const newPatient = {
          id: patients.length + 1,
          name: document.getElementById('name').value,
          age: parseInt(document.getElementById('age').value),
          contact: document.getElementById('contact').value
      };
      patients.push(newPatient);
      refreshPatientsTable();
      closeModal();
  };

  modal.style.display = 'block';
}

function showAddDoctorModal() {
  modalBody.innerHTML = `
      <h2>Add Doctor</h2>
      <form id="add-doctor-form">
          <div class="form-group">
              <label for="name">Name</label>
              <input type="text" id="name" required>
          </div>
          <div class="form-group">
              <label for="specialization">Specialization</label>
              <input type="text" id="specialization" required>
          </div>
          <div class="form-group">
              <label for="contact">Contact</label>
              <input type="text" id="contact" required>
          </div>
          <div class="modal-actions">
              <button type="button" class="cancel-btn" onclick="closeModal()">Cancel</button>
              <button type="submit" class="save-btn">Save</button>
          </div>
      </form>
  `;

  document.getElementById('add-doctor-form').onsubmit = (e) => {
      e.preventDefault();
      const newDoctor = {
          id: doctors.length + 1,
          name: document.getElementById('name').value,
          specialization: document.getElementById('specialization').value,
          contact: document.getElementById('contact').value
      };
      doctors.push(newDoctor);
      refreshDoctorsTable();
      closeModal();
  };

  modal.style.display = 'block';
}

function showAddAppointmentModal() {
  modalBody.innerHTML = `
      <h2>Add Appointment</h2>
      <form id="add-appointment-form">
          <div class="form-group">
              <label for="patient">Patient</label>
              <select id="patient" required>
                  ${patients.map(p => `<option value="${p.name}">${p.name}</option>`).join('')}
              </select>
          </div>
          <div class="form-group">
              <label for="doctor">Doctor</label>
              <select id="doctor" required>
                  ${doctors.map(d => `<option value="${d.name}">${d.name}</option>`).join('')}
              </select>
          </div>
          <div class="form-group">
              <label for="date">Date</label>
              <input type="date" id="date" required>
          </div>
          <div class="form-group">
              <label for="time">Time</label>
              <input type="time" id="time" required>
          </div>
          <div class="modal-actions">
              <button type="button" class="cancel-btn" onclick="closeModal()">Cancel</button>
              <button type="submit" class="save-btn">Save</button>
          </div>
      </form>
  `;

  document.getElementById('add-appointment-form').onsubmit = (e) => {
      e.preventDefault();
      const newAppointment = {
          id: appointments.length + 1,
          patientName: document.getElementById('patient').value,
          doctorName: document.getElementById('doctor').value,
          date: document.getElementById('date').value,
          time: document.getElementById('time').value
      };
      appointments.push(newAppointment);
      refreshAppointmentsTable();
      closeModal();
  };

  modal.style.display = 'block';
}

// Delete functions
function deletePatient(id) {
  if (confirm('Are you sure you want to delete this patient?')) {
      patients = patients.filter(patient => patient.id !== id);
      refreshPatientsTable();
  }
}

function deleteDoctor(id) {
  if (confirm('Are you sure you want to delete this doctor?')) {
      doctors = doctors.filter(doctor => doctor.id !== id);
      refreshDoctorsTable();
  }
}

function deleteAppointment(id) {
  if (confirm('Are you sure you want to delete this appointment?')) {
      appointments = appointments.filter(appointment => appointment.id !== id);
      refreshAppointmentsTable();
  }
}

// Edit functions
function editPatient(id) {
  const patient = patients.find(p => p.id === id);
  modalBody.innerHTML = `
      <h2>Edit Patient</h2>
      <form id="edit-patient-form">
          <div class="form-group">
              <label for="name">Name</label>
              <input type="text" id="name" value="${patient.name}" required>
          </div>
          <div class="form-group">
              <label for="age">Age</label>
              <input type="number" id="age" value="${patient.age}" required>
          </div>
          <div class="form-group">
              <label for="contact">Contact</label>
              <input type="text" id="contact" value="${patient.contact}" required>
          </div>
          <div class="modal-actions">
              <button type="button" class="cancel-btn" onclick="closeModal()">Cancel</button>
              <button type="submit" class="save-btn">Save</button>
          </div>
      </form>
  `;

  document.getElementById('edit-patient-form').onsubmit = (e) => {
      e.preventDefault();
      const index = patients.findIndex(p => p.id === id);
      patients[index] = {
          ...patients[index],
          name: document.getElementById('name').value,
          age: parseInt(document.getElementById('age').value),
          contact: document.getElementById('contact').value
      };
      refreshPatientsTable();
      closeModal();
  };

  modal.style.display = 'block';
}

function editDoctor(id) {
  const doctor = doctors.find(d => d.id === id);
  modalBody.innerHTML = `
      <h2>Edit Doctor</h2>
      <form id="edit-doctor-form">
          <div class="form-group">
              <label for="name">Name</label>
              <input type="text" id="name" value="${doctor.name}" required>
          </div>
          <div class="form-group">
              <label for="specialization">Specialization</label>
              <input type="text" id="specialization" value="${doctor.specialization}" required>
          </div>
          <div class="form-group">
              <label for="contact">Contact</label>
              <input type="text" id="contact" value="${doctor.contact}" required>
          </div>
          <div class="modal-actions">
              <button type="button" class="cancel-btn" onclick="closeModal()">Cancel</button>
              <button type="submit" class="save-btn">Save</button>
          </div>
      </form>
  `;

  document.getElementById('edit-doctor-form').onsubmit = (e) => {
      e.preventDefault();
      const index = doctors.findIndex(d => d.id === id);
      doctors[index] = {
          ...doctors[index],
          name: document.getElementById('name').value,
          specialization: document.getElementById('specialization').value,
          contact: document.getElementById('contact').value
      };
      refreshDoctorsTable();
      closeModal();
  };

  modal.style.display = 'block';
}

function editAppointment(id) {
  const appointment = appointments.find(a => a.id === id);
  modalBody.innerHTML = `
      <h2>Edit Appointment</h2>
      <form id="edit-appointment-form">
          <div class="form-group">
              <label for="patient">Patient</label>
              <select id="patient" required>
                  ${patients.map(p => `
                      <option value="${p.name}" ${p.name === appointment.patientName ? 'selected' : ''}>
                          ${p.name}
                      </option>
                  `).join('')}
              </select>
          </div>
          <div class="form-group">
              <label for="doctor">Doctor</label>
              <select id="doctor" required>
                  ${doctors.map(d => `
                      <option value="${d.name}" ${d.name === appointment.doctorName ? 'selected' : ''}>
                          ${d.name}
                      </option>
                  `).join('')}
              </select>
          </div>
          <div class="form-group">
              <label for="date">Date</label>
              <input type="date" id="date" value="${appointment.date}" required>
          </div>
          <div class="form-group">
              <label for="time">Time</label>
              <input type="time" id="time" value="${appointment.time}" required>
          </div>
          <div class="modal-actions">
              <button type="button" class="cancel-btn" onclick="closeModal()">Cancel</button>
              <button type="submit" class="save-btn">Save</button>
          </div>
      </form>
  `;

  document.getElementById('edit-appointment-form').onsubmit = (e) => {
      e.preventDefault();
      const index = appointments.findIndex(a => a.id === id);
      appointments[index] = {
          ...appointments[index],
          patientName: document.getElementById('patient').value,
          doctorName: document.getElementById('doctor').value,
          date: document.getElementById('date').value,
          time: document.getElementById('time').value
      };
      refreshAppointmentsTable();
      closeModal();
  };

  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

// Initialize tables
refreshTables();