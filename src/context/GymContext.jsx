import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api } from "../api/client";

const GymContext = createContext(null);

export function GymProvider({ children }) {
  const [members, setMembers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    try {
      setError(null);
      const [membersData, trainersData, statsData] = await Promise.all([
        api.members.list(),
        api.trainers.list(),
        api.statistics(),
      ]);
      setMembers(membersData);
      setTrainers(trainersData);
      setStatistics(statsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <GymContext.Provider value={{ members, trainers, statistics, loading, error, refresh }}>
      {children}
    </GymContext.Provider>
  );
}

export function useGym() {
  const ctx = useContext(GymContext);
  if (!ctx) throw new Error("useGym must be used within a GymProvider");
  return ctx;
}
