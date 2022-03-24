import { Injectable } from "@angular/core";
import neo4j from "neo4j-driver";
import { DataService } from "./data.service";

@Injectable({
  providedIn: "root",
})
export class Neo4jService {
  constructor(private dataService: DataService) {}

  driver: any;

  async verifyConnectivity(form: any) {
    this.driver = neo4j.driver(
      form.address,
      neo4j.auth.basic(form.username, form.password),
      { encrypted: false, maxConnectionLifetime: 120,disableLosslessIntegers: true }
    );

    try {
      this.driver.verifyConnectivity();

      return true;
    } catch (error) {
      return error;
    }
  }

  async verifySession(form: any) {
    try {
      const session = await this.driver.session({
        database: form.name,
        defaultAccessMode: neo4j.session.READ,
      });

      const resp = await session.run("MATCH(n) return n LIMIT 1");

      session.close();

      return true;
    } catch (error) {
      throw error;
    }
  }

  async runQuery(query: string) {
    const myForm = this.dataService.retrieveForm();
    const session = this.driver.session({
      database: myForm.name,
      defaultAccessMode: neo4j.session.READ,
    });

    try {
      return await session.run(query);
    } catch (error) {
      throw error;
    } finally {
      session.close();
    }
  }

  async getLabelNodes() {
    const myForm = this.dataService.retrieveForm();
    const session = this.driver.session({
      database: myForm.name,
      defaultAccessMode: neo4j.session.READ,
    });
    const query = "CALL db.labels()";

    try {
      const result = await session.run(query);
      const nodeLabels: any[] = [];

      result.records.forEach((record: { get: (arg0: string) => any }) => {
        nodeLabels.push(record.get("label"));
      });

      return nodeLabels;
    } catch (error) {
      throw error;
    } finally {
      session.close();
    }
  }

  async getRelationships() {
    const myForm = this.dataService.retrieveForm();
    const session = this.driver.session({
      database: myForm.name,
      defaultAccessMode: neo4j.session.READ,
    });
    const query = "call db.relationshipTypes()";

    try {
      const result = await session.run(query);
      const relationships: any[] = [];

      result.records.forEach((record: { get: (arg0: string) => any }) => {
        relationships.push([record.get("relationshipType")]);
      });

      return relationships;
    } catch (error) {
      throw error;
    } finally {
      session.close();
    }
  }
}
