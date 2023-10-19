import config from "../config/config";

import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  storage;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Apprwrite error ::configjs", error);
    }
  }
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log(`Appwrite service ::`, error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log(`Appwrite service ::`, error);
      return false;
    }
}

async getPost(slug){
    try {
        return await this.databases.getDocument(
            config.appwriteDatabaseID,
            config.appwriteCollectionId,
            slug
        )
    } catch (error) {
        console.log(`Appwrite service ::`, error);
        return false
    } 
  } 
  async listPost(queries = [Query.equal('status', 'active')]){
try {
    
    return await this.listsDocuments(
        config.appwriteDatabaseID,
        config.appwriteCollectionId,
        queries

    )
} catch (error) {
    console.log('appwrite error config', error)
    return false
}
  } 


  //file upload serives

  async uploadFile(file){
    try {
        return await this.storage.createFile(
            config.appwriteBucketID,
            ID.unique(),
            file
        )
    } catch (error) {
        console.log('appwrite error:: upload file::', error)
        return false;

    }

  }
  async deleteFile(fileId){
try {
    await this.storage.deleteFile(
        config.appwriteBucketID,
        fileId
        )
        return true
    
} catch (error) {
    console.log('Appwrite error:: deleteFile::', error)
}
  }
  getFilePreview(fileId){
    return this.storage.getFilePreview(
        config.appwriteBucketID,
        fileId
    )
  }

}
const service = new Service();
export default service;
