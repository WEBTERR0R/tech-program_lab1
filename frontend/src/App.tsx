
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    try {
      const response = await taskApi.createTask({
        title: newTask.title,
        description: newTask.description,
        completed: false,
      });

      if (response.success && response.data) {
        setTasks([...tasks, response.data]);
        setNewTask({ title: '', description: '' });
      }
    } catch {
      setError('Failed to create task');
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      const response = await taskApi.deleteTask(id);
      if (response.success) {
        setTasks(tasks.filter((t) => t.id !== id));
      }
    } catch {
      setError('Failed to delete task');
    }
  };

  const styles = {
    container: {
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: '#1a1a1a',
      minHeight: '100vh',
      color: '#e0e0e0',
    },
    title: {
      color: '#ffffff',
      textAlign: 'center' as const,
      marginBottom: '30px',
    },
    error: {
      color: '#ff6b6b',
      marginBottom: '10px',
      padding: '10px',
      backgroundColor: 'rgba(255, 107, 107, 0.1)',
      borderRadius: '4px',
    },
    form: {
      marginBottom: '30px',
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap' as const,
    },
    input: {
      padding: '10px',
      border: '1px solid #333',
      borderRadius: '4px',
      fontSize: '14px',
      flex: 1,
      minWidth: '200px',
      backgroundColor: '#2d2d2d',
      color: '#e0e0e0',
      outline: 'none',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#4a9eff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 'bold' as const,
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#3a7acc',
    },
    taskList: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '10px',
    },
    taskCard: {
      border: '1px solid #333',
      padding: '15px',
      borderRadius: '8px',
      backgroundColor: '#2d2d2d',
      transition: 'transform 0.2s, box-shadow 0.2s',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    },
    taskTitle: {
      margin: '0 0 10px 0',
      color: '#ffffff',
      fontSize: '18px',
    },
    taskDescription: {
      margin: '0 0 15px 0',
      color: '#b0b0b0',
      fontSize: '14px',
    },
    deleteButton: {
      padding: '6px 12px',
      backgroundColor: '#ff4a4a',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: 'bold' as const,
      transition: 'background-color 0.3s',
    },
    loading: {
      textAlign: 'center' as const,
      color: '#888',
      padding: '20px',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📋 Task Manager</h1>

      {error && <div style={styles.error}>{error}</div>}

      <form onSubmit={handleCreateTask} style={styles.form}>
        <input
          type="text"
          placeholder="Task title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          style={styles.input}
        />
        <button
          type="submit"
          style={styles.button}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#3a7acc';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#4a9eff';
          }}
        >
          Add Task
        </button>
      </form>

      {loading && <div style={styles.loading}>Loading tasks...</div>}

      <div style={styles.taskList}>
        {tasks.map((task) => (
          <div
            key={task.id}
            style={styles.taskCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
            }}
          >
            <h3 style={styles.taskTitle}>{task.title}</h3>
            <p style={styles.taskDescription}>{task.description}</p>
            <button
              onClick={() => handleDeleteTask(task.id)}
              style={styles.deleteButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ff3333';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ff4a4a';
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {tasks.length === 0 && !loading && (
        <div style={{ textAlign: 'center', color: '#666', marginTop: '50px' }}>
          No tasks yet. Add your first task above! ✨
        </div>
      )}
    </div>
  );
}

export default App;
