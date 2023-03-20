import { useDisclosure } from '@mantine/hooks';
import { useForm } from "@mantine/form";
import { Modal, Button, Group, TextInput, Textarea } from "@mantine/core";
import { ENDPOINT, Todo } from '../App';
import { KeyedMutator } from 'swr';


function AddTodo({mutate}: { mutate: KeyedMutator<Todo[]>}) {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: { 
      title: "" ,
      body: "",
    },
  });

  const createTodo = async (values: { title: string, body: string }) => {
    const updated = await fetch(`${ENDPOINT}/api/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        }).then((res) => res.json());
        mutate(updated);
        form.reset();
        close();
  };

  return (
     <>
      <Modal opened={opened} onClose={close} title="Create todo" centered>
        <form onSubmit={form.onSubmit(createTodo)}>
          <TextInput
          required
          mb={12}
          label="Todo"
          placeholder="What do you want to do?"
          {...form.getInputProps("title")}
          />
          <Textarea 
          required
          mb={12}
          label="Body"
          placeholder="What do you want to do?"
          {...form.getInputProps("body")}
          />

          <Button type="submit">
            Create todo
          </Button>
        </form>
      </Modal>

      <Group position="center">
        <Button fullWidth mb={12} onClick={open}>
          Add todo
        </Button>
      </Group>
  
    </> 
  );
}

export default AddTodo;