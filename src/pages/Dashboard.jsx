import { useEffect, useState } from "react";
import { getMyGroups, connectGroup } from "../services/group";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


export default function Dashboard() {
    const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGroups();
  }, []);

  async function handleConnectGroup() {
  try {
    const result = await connectGroup();

    console.log(result);

    alert(
      `Connection Code: ${result.code}\n\nExpires: ${result.expires_at}`
    );
  } catch (err) {
    console.error(err);
  }
}

  async function loadGroups() {
    try {
      const data = await getMyGroups();

      console.log("Groups:", data);

      setGroups(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dashboard">
      <h1>VOXLY Dashboard</h1>
      <button
  className="connect-button"
  onClick={handleConnectGroup}
>
  + Connect Telegram Group
</button>

      {loading ? (
        <p>Loading groups...</p>
      ) : (
<>
  <div className="stats-card">
    <h3>Groups</h3>
    <p>{groups.Count || 0}</p>
  </div>

  <div className="groups-list">
    {groups.Data?.map((group) => (
<div
  key={group.id}
  className="group-card"
  onClick={() => navigate(`/groups/${group.id}`)}
>
        <h3>{group.title}</h3>

        <p>
          Telegram ID: {group.telegram_group_id}
        </p>
      </div>
    ))}
  </div>
</>
      )}
    </div>
  );
}

