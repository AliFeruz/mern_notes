import User from '../models/user.js';


export const getUser = async (req, res) => {
   try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);

   } catch (error) {
    res.status(404).json({ message: error.message});
   } 
};


export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.findByIdAndDelete(id);

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
