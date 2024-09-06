import { DocumentPickerAsset } from "expo-document-picker";
import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
  Storage,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.savarkavi.aora",
  projectId: "66d14e620013dd766e9f",
  databaseId: "66d157b3002b1465e42a",
  userCollectionId: "66d157fc0014d718efab",
  photoCollectionId: "66d15819001b81a1b471",
  storageId: "66d15ca7002ec2230c02",
};

const {
  databaseId,
  endpoint,
  platform,
  projectId,
  storageId,
  userCollectionId,
  photoCollectionId,
} = config;

interface CreateUserParams {
  email: string;
  password: string;
  username: string;
}

interface SignInParams {
  email: string;
  password: string;
}

const client = new Client();
client.setEndpoint(endpoint).setProject(projectId).setPlatform(platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async ({
  email,
  password,
  username,
}: CreateUserParams) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error();

    const avatarUrl = avatars.getInitials(username);

    await signIn({ email, password });

    const newUser = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      { accountId: newAccount.$id, email, username, avatar: avatarUrl }
    );

    return newUser;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, photoCollectionId);
    return posts.documents;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, photoCollectionId, [
      Query.orderDesc("$createdAt"),
      Query.limit(7),
    ]);
    return posts.documents;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const searchPosts = async (query: string) => {
  try {
    const posts = await databases.listDocuments(databaseId, photoCollectionId, [
      Query.search("title", query),
    ]);
    return posts.documents;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const getUserPosts = async (userId: string) => {
  try {
    const posts = await databases.listDocuments(databaseId, photoCollectionId, [
      Query.equal("user", userId),
    ]);
    return posts.documents;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const signOut = async () => {
  try {
    await account.deleteSession("current");
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const uploadFile = async (file: DocumentPickerAsset) => {
  if (!file) return;

  const { name, uri, lastModified, mimeType, size } = file;

  if (!name || !uri || !lastModified || !mimeType || !size) return;

  try {
    const uploadedFile = await storage.createFile(storageId, ID.unique(), {
      type: mimeType,
      name,
      size,
      uri,
    });

    const fileUrl = storage.getFilePreview(
      storageId,
      uploadedFile.$id,
      2000,
      2000
    );

    if (!fileUrl) {
      throw new Error("Could not get file url");
    }

    return fileUrl;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const createPost = async (
  form: { title: string; prompt: string; file: DocumentPickerAsset | null },
  userId: string
) => {
  if (!form.title || !form.prompt || !form.file) return null;

  try {
    const imageUrl = await uploadFile(form.file);

    const newPost = await databases.createDocument(
      databaseId,
      photoCollectionId,
      ID.unique(),
      {
        title: form.title,
        prompt: form.prompt,
        thumnail: imageUrl,
        user: userId,
      }
    );
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
