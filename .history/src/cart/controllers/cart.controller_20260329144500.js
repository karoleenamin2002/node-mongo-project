import todoModel from "../model/todo.model.js";

export const getAllTodos = async (req, res) => {
  let todos = await todoModel
    .find()
    .populate({ path: "userId", select: "username email" });
  res.status(200).json({ message: "success", data: todos });
};

export const createTodo = async (req, res) => {
  let { title, status, userId } = req.body;
  try {
    let todo = await todoModel.create({ title, status, userId });
    res.status(201).json({ message: "success", data: todo });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

export const getTodo = async (req, res) => {
  let { id } = req.params;
  let todo = await todoModel.findById(id);
  if (!todo) {
    return res.status(404).json({
      message: "Todo Not Found",
    });
  }
  res.status(200).json({ message: "success", data: todo });
};

export const updateTodo = async (req, res) => {
  let { id } = req.params;
  //   let { title, status } = req.body;
  let todo = await todoModel.findByIdAndUpdate(id, req.body, {
    returnDocument: "after",
    runValidators: true,
    // new:true;
  });
  if (!todo) {
    return res.status(404).json({ message: "Todo not found!" });
  }
  res.status(200).json({ message: "success", data: todo });
};

export const deleteTodo = async (req, res) => {
  let { id } = req.params;

  let todo = await todoModel.findByIdAndDelete(id);
  if (!todo) {
    return res.status(404).json({
      message: "Todo Not Found",
    });
  }
  return res.status(204).json({ message: "success" });
};
