import create from "zustand";
import shallow from "zustand/shallow";

const useStore = create(
  (set) => ({
    persons: [],
    addedPerson: (person) =>
      set((state) => {
        const id = Math.random().toString(32);
        return { persons: [...state.persons, { id, ...person }] };
      }),
    clearPersons: () => set({ persons: [] }),
  }),
  shallow
);

const PersonList = () => {
  const persons = useStore((state) => state.persons);

  console.log(persons);

  return (
    <table className="my-4">
      <thead className="font-bold">
        <tr>
          <td width="50%">name</td>
          <td width="50%">last name</td>
        </tr>
      </thead>
      <tbody>
        {persons.map((person) => (
          <tr key={person.id}>
            <td>{person.name}</td>
            <td>{person.lastName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

function App() {
  const { addedPerson, clearPersons } = useStore(
    (state) => ({
      addedPerson: state.addedPerson,
      clearPersons: state.clearPersons,
    }),
    shallow
  );

  const handleSubmit = (formEvent) => {
    formEvent.preventDefault();
    const {
      name: { value: name },
      last_name: { value: lastName },
    } = formEvent.target.elements;

    const submitter = formEvent.nativeEvent.submitter.name;

    if (submitter === "btn_add") {
      try {
        addedPerson({ name, lastName });
        formEvent.target.reset();
      } catch (e) {
        console.error(e);
      }
    } else if (submitter === "btn_clear") {
      clearPersons();
    }
  };

  console.log("rendering..");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-[250px]">
        <PersonList />

        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name">name</label>
            <input className="input-form" id="name" name="name" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="last_name">last name</label>
            <input className="input-form" id="last_name" name="last_name" />
          </div>
          <button type="submuit" name="btn_add" className="btn-primary">
            add
          </button>
          <button type="submuit" name="btn_clear" className="btn-danger">
            clear
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
