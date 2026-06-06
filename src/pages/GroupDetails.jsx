import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGroupById } from "../services/group";
import { createSession } from "../services/session";



export default function GroupDetails() {
  const { id } = useParams();

  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
const [showForm, setShowForm] = useState(false);

const [sessionForm, setSessionForm] = useState({
  title: "",
  registration_open: "",
  registration_close: "",
  max_seats: 10,
});
  useEffect(() => {
    loadGroup();
  }, []);

  function handleChange(e) {
  setSessionForm({
    ...sessionForm,
    [e.target.name]: e.target.value,
  });
}
async function handleCreateSession(e) {
  e.preventDefault();

  try {
    const payload = {
      group_id: group.id,
      title: sessionForm.title,
      registration_open: new Date(
        sessionForm.registration_open
      ).toISOString(),
      registration_close: new Date(
        sessionForm.registration_close
      ).toISOString(),
      max_seats: Number(sessionForm.max_seats),
    };

    const result = await createSession(payload);

    console.log(result);

    alert("Session created successfully");

    setShowForm(false);

  } catch (err) {
    console.error(err);
  }
}

  async function loadGroup() {
    try {
      const response = await getGroupById(id);

      setGroup(response.Data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="dashboard">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h1>{group.title}</h1>

      <div className="group-card">
        <p>
          <strong>Telegram Group ID:</strong>
        </p>

        <p>{group.telegram_group_id}</p>

        <br />

        <p>
          <strong>Created At:</strong>
        </p>

        <p>
          {new Date(group.created_at).toLocaleString()}
        </p>
      </div>

<button
  className="connect-button"
  onClick={() => setShowForm(!showForm)}
>
  Create Session
</button>
{showForm && (
  <form
    className="group-card"
    onSubmit={handleCreateSession}
  >
<label>Session Title</label>

<input
  type="text"
  name="title"
  placeholder="IELTS Mock Speaking"
  value={sessionForm.title}
  onChange={handleChange}
  required
/>

<label>Registration Opens</label>

<input
  type="datetime-local"
  name="registration_open"
  value={sessionForm.registration_open}
  onChange={handleChange}
  required
/>

<label>Registration Closes</label>

<input
  type="datetime-local"
  name="registration_close"
  value={sessionForm.registration_close}
  onChange={handleChange}
  required
/>

<label>Maximum Seats</label>

<input
  type="number"
  name="max_seats"
  value={sessionForm.max_seats}
  onChange={handleChange}
  min="1"
  required
/>

    <button
      type="submit"
      className="connect-button"
    >
      Create
    </button>
  </form>
)}
    </div>
  );
}