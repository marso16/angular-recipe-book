import { Injectable } from "@angular/core";
import { DataStorageService } from "../../services/data-storage.service";
import { Recipe } from "./recipe.model";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { RecipeService } from "src/app/services/recipe.service";

@Injectable({
  providedIn: "root",
})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private dst: DataStorageService, private rs: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.rs.getRecipes();
    if (recipes.length === 0) {
      return this.dst.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
